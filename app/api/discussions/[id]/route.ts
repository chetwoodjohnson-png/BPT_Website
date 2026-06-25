import { NextRequest, NextResponse } from 'next/server';
import { discussionStore, initializeDiscussions } from '../route';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    initializeDiscussions();
    const discussion = discussionStore.get(params.id);

    if (!discussion) {
      return NextResponse.json({ error: 'Discussion not found' }, { status: 404 });
    }

    return NextResponse.json(discussion);
  } catch (error) {
    console.error('Error fetching discussion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discussion' },
      { status: 500 }
    );
  }
}

