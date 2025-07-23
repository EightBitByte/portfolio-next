'use client';

import { Trophy } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "./dialog";
import { achievements } from "@/utils/achievements";
import Achievement from "@/components/ui/achievement";
import type { AchievementProps } from "@/components/ui/achievement";
import { useState, useEffect, Fragment } from "react";

const ACHIEVEMENTS_LOCAL_STORAGE_KEY = "achievements";

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
          <DialogContent className="max-w-[425px] max-h-[725px] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Achievements</DialogTitle>
            </DialogHeader>
            <DialogDescription hidden>
              All locked and unlocked achievements for jacobmoy.com.
            </DialogDescription>
            <div className="flex flex-col">
              {fetchedAchievements.map((props, idx) => 
                <Fragment key={props.info.title}>
                  <Achievement
                    info={props.info}
                    unlocked={props.unlocked}
                  />
                  {idx != fetchedAchievements.length - 1 &&
                  <div className="my-6 dark:bg-zinc-400 bg-zinc-500 w-full h-[1px]"/>}
                </Fragment>
              )}
            </div>
          </DialogContent>
        </Dialog>
    </div>
  )
}
