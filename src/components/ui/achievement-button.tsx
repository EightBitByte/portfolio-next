'use client';

import { Trophy } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "./dialog";
import { achievements } from "@/utils/achievements";
import Achievement from "@/components/ui/achievement";
import type { AchievementProps } from "@/components/ui/achievement";
import { useState, useEffect, Fragment } from "react";
import AchievementDialogContent from "./achievement-dialog-content";

export default function AchievementButton() {
  const [fetchedAchievements, setFetchedAchievements] = useState<AchievementProps[]>([]);

  useEffect(() => {
    setFetchedAchievements(achievements.fetchAchievements());

    const unsubscribe = achievements.subscribe(() => {
      console.log("Achievements updated, re-rendering list...");
      setFetchedAchievements(achievements.fetchAchievements());
    });

    return () => {
      unsubscribe();
    };
  }, [])

  return (
    <div className="fixed top-16 right-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Trophy/>
          </Button>
        </DialogTrigger>
        <AchievementDialogContent fetchedAchievements={fetchedAchievements}/>
      </Dialog>
    </div>
  )
}
