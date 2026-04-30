"use client";

import dynamic from "next/dynamic";

// Dynamically import heavy, non-critical UI to avoid First Load JS bloat
export const ToasterProvider = dynamic(
  () => import("@/components/toaster-provider").then((mod) => mod.ToasterProvider),
  { ssr: false }
);

export const AchievementButton = dynamic(
  () => import("@/components/ui/achievement-button"),
  { ssr: false }
);
