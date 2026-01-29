'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/game-store';

interface BlogPostTrackerProps {
  postId: number;
}

export default function BlogPostTracker({ postId }: BlogPostTrackerProps) {
  const markBlogPostAsRead = useGameStore((state) => state.markBlogPostAsRead);

  useEffect(() => {
    markBlogPostAsRead(postId);
  }, [postId, markBlogPostAsRead]);

  return null;
}