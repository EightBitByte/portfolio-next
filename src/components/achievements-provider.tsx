'use client';

import { achievements } from "@/utils/achievements";
import { useEffect } from "react";

const ACHIEVEMENTS_LOCAL_STORAGE_KEY = "achievements";

export default function AchievementsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const userInfoString = localStorage.getItem(ACHIEVEMENTS_LOCAL_STORAGE_KEY);
    if (userInfoString) {
      achievements.loadUnlockedAchievements(userInfoString);
    }
  }, []);

  return <>{children}</>;
}