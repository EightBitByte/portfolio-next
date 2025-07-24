'use client';

import { Trophy } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogTrigger } from "./dialog";
import AchievementDialogContent from "./achievement-dialog-content";

export default function AchievementButton() {

  return (
    <div className="fixed top-16 right-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Trophy/>
          </Button>
        </DialogTrigger>
        <AchievementDialogContent/>
      </Dialog>
    </div>
  )
}
