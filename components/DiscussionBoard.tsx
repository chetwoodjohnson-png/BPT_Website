'use client';

import { useState, useEffect } from 'react';
import './DiscussionBoard.css';

interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface Discussion {
  id: string;
  title: string;
  category: string;
  author: string;
  content: string;
  timestamp: string;
  replies: Reply[];
}

export default function DiscussionBoard() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [showNewThread, setShowNewThread] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newThreadData, setNewThreadData] = useState({
    title: '',
    category: 'BPMS™ product questions',
    author: '',
    content: '',
  });

  const [replyData, setReplyData] = useState({
    author: '',
    content: '',
  });

  const categories = [
    'Energy audit best practices',
    'BPMS™ product questions',
    'BPMSField™ mobile workflows',
    'FluxSense Analyzer™ development',
  ];

  // Load discussions from localStorage
  useEffect(() => {
    const loadDiscussions = async () => {
      try {
        const response = await fetch('/api/discussions');
        const data = await response.json();
        setDiscussions(data);
      } catch (error) {
        console.error('Failed to load discussions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDiscussions();
  }, []);

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newThreadData.title || !newThreadData.author || !newThreadData.content) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newThreadData),
      });

      const newDiscussion = await response.json();
      setDiscussions([newDiscussion, ...discussions]);
      setNewThreadData({
        title: '',
        category: 'BPMS™ product questions',
        author: '',
        content: '',
      });
      setShowNewThread(false);
    } catch (error) {
      console.error('Failed to create thread:', error);
      alert('Failed to create thread');
    }
  };

  const handleAddReply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDiscussion || !replyData.author || !replyData.content) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`/api/discussions/${selectedDiscussion.id}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(replyData),
      });

      const updatedDiscussion = await response.json();
      setSelectedDiscussion(updatedDiscussion);
      setDiscussions(
        discussions.map((d) => (d.id === updatedDiscussion.id ? updatedDiscussion : d))
      );
      setReplyData({ author: '', content: '' });
    } catch (error) {
      console.error('Failed to add reply:', error);
      alert('Failed to add reply');
    }
  };

  if (loading) {
    return <div className="discussionBoard">Loading discussions...</div>;
  }

  return (
    <div className="discussionBoard">
      {selectedDiscussion ? (
        <div className="discussionThread">
          <button
            className="backButton"
            onClick={() => {
              setSelectedDiscussion(null);
              setReplyData({ author: '', content: '' });
            }}
          >
            ← Back to Discussions
          </button>

          <div className="originalPost">
            <div className="postHeader">
              <h2>{selectedDiscussion.title}</h2>
              <span className="tag">{selectedDiscussion.category}</span>
            </div>
            <p className="postContent">{selectedDiscussion.content}</p>
            <div className="postFooter">
              <span className="author">Posted by {selectedDiscussion.author}</span>
              <span className="timestamp">{new Date(selectedDiscussion.timestamp).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="repliesSection">
            <h3>{selectedDiscussion.replies.length} Replies</h3>
            {selectedDiscussion.replies.map((reply) => (
              <div className="reply" key={reply.id}>
                <div className="replyHeader">
                  <span className="author">{reply.author}</span>
                  <span className="timestamp">{new Date(reply.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="replyContent">{reply.content}</p>
              </div>
            ))}
          </div>

          <form className="replyForm" onSubmit={handleAddReply}>
            <h4>Add Your Reply</h4>
            <input
              type="text"
              placeholder="Your name"
              value={replyData.author}
              onChange={(e) => setReplyData({ ...replyData, author: e.target.value })}
              required
            />
            <textarea
              placeholder="Your reply..."
              rows={6}
              value={replyData.content}
              onChange={(e) => setReplyData({ ...replyData, content: e.target.value })}
              required
            />
            <button type="submit" className="submitButton">
              Post Reply
            </button>
          </form>
        </div>
      ) : (
        <div className="discussionsList">
          {showNewThread ? (
            <form className="newThreadForm" onSubmit={handleCreateThread}>
              <h3>Start a New Discussion</h3>
              <input
                type="text"
                placeholder="Thread title"
                value={newThreadData.title}
                onChange={(e) => setNewThreadData({ ...newThreadData, title: e.target.value })}
                required
              />
              <select
                value={newThreadData.category}
                onChange={(e) => setNewThreadData({ ...newThreadData, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Your name"
                value={newThreadData.author}
                onChange={(e) => setNewThreadData({ ...newThreadData, author: e.target.value })}
                required
              />
              <textarea
                placeholder="What's on your mind?"
                rows={8}
                value={newThreadData.content}
                onChange={(e) => setNewThreadData({ ...newThreadData, content: e.target.value })}
                required
              />
              <div className="formButtons">
                <button type="submit" className="submitButton">
                  Create Discussion
                </button>
                <button
                  type="button"
                  className="cancelButton"
                  onClick={() => setShowNewThread(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="listHeader">
                <h2>Active Discussions</h2>
                <button className="newThreadButton" onClick={() => setShowNewThread(true)}>
                  + Start New Discussion
                </button>
              </div>

              {discussions.length === 0 ? (
                <div className="noDiscussions">
                  <p>No discussions yet. Be the first to start one!</p>
                </div>
              ) : (
                <div className="discussionsList">
                  {discussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className="discussionCard"
                      onClick={() => setSelectedDiscussion(discussion)}
                    >
                      <div className="cardContent">
                        <h4>{discussion.title}</h4>
                        <p>{discussion.content.substring(0, 100)}...</p>
                        <div className="cardFooter">
                          <span className="tag">{discussion.category}</span>
                          <span className="replyCount">{discussion.replies.length} replies</span>
                          <span className="author">by {discussion.author}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
