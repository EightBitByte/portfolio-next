import type { AchievementInfo } from "@/utils/achievement-handler";
import { BadgeCent } from "lucide-react";
import { AchievementIcon } from "./achievement";

interface AchievementUnlockToastProps {
  info: AchievementInfo;
}


export default function AchievementUnlockToast({ 
  info 
} : AchievementUnlockToastProps) {
  return (
    <div className="flex flex-row gap-2 w-full items-center">
      <div className={`w-12 h-12 rounded-md flex ${info.color} items-center justify-center flex-shrink-0`}>
        <AchievementIcon IconComponent={info.icon} size={8}/>
      </div>
      <div>
        <div className="flex flex-row gap-4 items-center">
          <h1 className="text-lg">{info.title}</h1>
            <p className="dark:text-zinc-400 text-zinc-700 flex flex-row items-center gap-1">
              {info.points}
              <BadgeCent className="w-4 h-4"/>
            </p>
        </div>
        <h2 className="text-zinc-500 dark:text-zinc-400">{info.desc}</h2>
      </div>
    </div>
  )
}