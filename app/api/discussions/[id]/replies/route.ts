import { NextRequest, NextResponse } from 'next/server';
import { discussionStore, initializeDiscussions } from '../../route';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    initializeDiscussions();
    const { id } = await params;
    const body = await request.json();
    const discussion = discussionStore.get(id);

    if (!discussion) {
      return NextResponse.json({ error: 'Discussion not found' }, { status: 404 });
    }

    const newReply = {
      id: `r${Date.now()}`,
      author: body.author,
      content: body.content,
      timestamp: new Date().toISOString(),
    };

    discussion.replies.push(newReply);
    discussionStore.set(id, discussion);

    return NextResponse.json(discussion, { status: 201 });
  } catch (error) {
    console.error('Error adding reply:', error);
    return NextResponse.json({ error: 'Failed to add reply' }, { status: 500 });
  }
}
