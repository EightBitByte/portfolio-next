import { type AchievementInfo } from "@/utils/achievement-handler";
import { Lock, BadgeCent, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconWrapperProps {
  IconComponent: LucideIcon,
  size: number,
}

export const AchievementIcon = ({ IconComponent, size } : IconWrapperProps) => {
  return <IconComponent className={`w-${size} h-${size} stroke-foreground`}/>
}

export interface AchievementProps {
  info: AchievementInfo,
  unlocked: boolean,
}

export default function Achievement({
  info, 
  unlocked, 
}: AchievementProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr_7fr] w-full">
        <div className={cn(
          "w-12 h-12 rounded-md flex items-center justify-center",
          !unlocked && "",
          unlocked && info.color,
          )}>
          {!unlocked && <Lock className="w-7 h-7"/>}
          {unlocked && <AchievementIcon IconComponent={info.icon} size={7}/>}
        </div>
        <div className="w-full">
          <div className="flex flex-row justify-between w-full items-center">
            <h1 className="text-xl">{info.title}</h1>
            <p className="text-foreground/60 flex flex-row items-center gap-1">
              {info.points}
              <BadgeCent className="w-4 h-4"/>
            </p>
          </div>
          <h2 className="text-md text-foreground/60">
            {(!info.obfuscated || unlocked) && info.desc}
            {info.obfuscated && !unlocked && "???"}
          </h2>
          <h3 className="italic 
                        dark:text-amber-400
                        text-chart-5">
            {unlocked == true && info.flavor != null && info.flavor}
          </h3>
        </div>
      </div>
    </div>
  )
}