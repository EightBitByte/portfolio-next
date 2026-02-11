"use client";

import { Button } from "@/components/ui/button";
import { StatLink } from "@/components/ui/stat-link";
import { useGameStore } from "@/store/game-store";
import { useEffect } from "react";

export default function NotFound() {
  const unlockAchievement = useGameStore((state) => state.unlockAchievement);

  useEffect(() => {
    unlockAchievement("HOW_DID_WE_GET_HERE")
  }, [unlockAchievement]);

  return (
    <div className="flex flex-col flex-grow w-full items-center justify-center">
      <div className="flex flex-col gap-12 items-center">
        <h1 className="text-5xl font-bold">
          <span className="text-foreground/60">404 &mdash;</span> Not Found
        </h1>
        <StatLink href="/">
          <Button variant="outline">
            Back to safety!
          </Button>
        </StatLink>
      </div>
    </div>
  )
}