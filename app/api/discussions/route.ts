import { NextRequest, NextResponse } from 'next/server';

// Store discussions in memory (will reset on server restart)
// For persistence, use a database like Supabase, MongoDB, or PostgreSQL
const discussionStore = new Map<string, any>();

function initializeDiscussions() {
  if (discussionStore.size > 0) return;

  const initialDiscussions = [
    {
      id: '1',
      title: 'Best practices for energy audits',
      category: 'Energy audit best practices',
      author: 'John Smith',
      content: 'What are the most effective methodologies for conducting comprehensive energy audits? I\'d like to hear about your field experiences and recommendations.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      replies: [
        {
          id: 'r1',
          author: 'Sarah Johnson',
          content: 'Always start with a thorough walk-through and document all major systems. We use BPMS™ to track our findings consistently.',
          timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'r2',
          author: 'Mike Davis',
          content: 'Don\'t forget about thermal imaging! It reveals so much that\'s invisible to the naked eye.',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: '2',
      title: 'BPMS™ reporting features',
      category: 'BPMS™ product questions',
      author: 'Emma Wilson',
      content: 'Does BPMS™ support custom report templates? We need to generate reports tailored to our specific client requirements.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      replies: [
        {
          id: 'r3',
          author: 'Alex Chen',
          content: 'Yes, BPMS™ has flexible reporting. You can create custom templates and save them for reuse.',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
  ];

  initialDiscussions.forEach((d) => discussionStore.set(d.id, d));
}

// GET all discussions
export async function GET(request: NextRequest) {
  try {
    initializeDiscussions();
    const discussions = Array.from(discussionStore.values()).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return NextResponse.json(discussions);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    return NextResponse.json({ error: 'Failed to fetch discussions' }, { status: 500 });
  }
}

// POST new discussion
export async function POST(request: NextRequest) {
  try {
    initializeDiscussions();
    const body = await request.json();

    const newDiscussion = {
      id: Date.now().toString(),
      title: body.title,
      category: body.category,
      author: body.author,
      content: body.content,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    discussionStore.set(newDiscussion.id, newDiscussion);
    return NextResponse.json(newDiscussion, { status: 201 });
  } catch (error) {
    console.error('Error creating discussion:', error);
    return NextResponse.json({ error: 'Failed to create discussion' }, { status: 500 });
  }
}

export { discussionStore, initializeDiscussions };
