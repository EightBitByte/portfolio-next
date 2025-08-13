import { type AchievementInfo } from "@/utils/achievement-handler";
import { Lock, BadgeCent, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/utils";

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
  if (info.secret && !unlocked)
    return (
      <>
      </>
    );


  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr_7fr] gap-2 w-full">
        <div className={cn(
          "w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center",
          !unlocked && "",
          unlocked && info.rarity === "COMMON" && `bg-rarity-common`,
          unlocked && info.rarity === "UNCOMMON" && `bg-rarity-uncommon`,
          unlocked && info.rarity === "RARE" && `bg-rarity-rare`,
          unlocked && info.rarity === "EPIC" && `bg-rarity-epic`,
          unlocked && info.rarity === "LEGENDARY" && `bg-rarity-legendary`,
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
                         text-flavor">
            {unlocked == true && info.flavor != null && info.flavor}
          </h3>
        </div>
      </div>
    </div>
  )
}