'use client';

import { useEffect } from 'react';
import { achievements } from '@/utils/achievement-handler';

interface BlogPostTrackerProps {
  postId: number;
}

export default function BlogPostTracker({ postId }: BlogPostTrackerProps) {
  useEffect(() => {
    achievements.markBlogPostAsRead(postId);
  }, [postId]);

  return null;
}