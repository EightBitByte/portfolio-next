'use client';

import { useGameStore } from "@/store/game-store";
import { useEffect } from "react";


export default function AchievementsProvider({
  children,
  numPosts,
}: {
  children: React.ReactNode;
  numPosts: number;
}) {
  const init = useGameStore((state) => state.init);
  const unlockAchievement = useGameStore((state) => state.unlockAchievement);

  useEffect(() => {
    init(numPosts);
    unlockAchievement("WELCOME");
  }, [numPosts, init, unlockAchievement]);

  return <>{children}</>;
}