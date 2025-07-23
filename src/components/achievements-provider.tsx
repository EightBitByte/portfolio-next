'use client';

import { achievements } from "@/utils/achievements";
import { useEffect } from "react";


export default function AchievementsProvider({
  children,
  numPosts,
}: {
  children: React.ReactNode;
  numPosts: number;
}) {
  useEffect(() => {
    achievements.init(numPosts);
    achievements.unlockAchievement("WELCOME");
  }, [numPosts]);

  return <>{children}</>;
}