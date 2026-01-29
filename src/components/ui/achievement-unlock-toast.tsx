import type { AchievementInfo } from "@/store/game-store";
import { BadgeCent, X } from "lucide-react";
import { AchievementIcon } from "./achievement";
import { cn } from "@/utils/utils";
import { Button } from "./button";
import { toast } from "sonner";

interface AchievementUnlockToastProps {
  info: AchievementInfo;
  id: string | number;
}


export default function AchievementUnlockToast({
  info,
  id,
}: AchievementUnlockToastProps) {
  return (
    <div
      className="flex flex-row gap-2 max-w-full min-w-fit items-center 
                 bg-background border border-border p-4 rounded-md
                 md:w-lg"
      style={{ fontFamily: 'var(--font-karla)' }}>
      <Button
        className="absolute top-2 right-2"
        variant="outline"
        size="icon"
        onClick={() => { toast.dismiss(id) }}>
        <X />
      </Button>
      <div className={cn(
        `w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0`,
        info.rarity === "COMMON" && `bg-rarity-common`,
        info.rarity === "UNCOMMON" && `bg-rarity-uncommon`,
        info.rarity === "RARE" && `bg-rarity-rare`,
        info.rarity === "EPIC" && `bg-rarity-epic`,
        info.rarity === "LEGENDARY" && `bg-rarity-legendary`,
      )}>
        <AchievementIcon IconComponent={info.icon} size={8} />
      </div>
      <div>
        <div className="flex flex-row gap-4 items-center">
          <h1 className="text-lg">{info.title}</h1>
          <p className="dark:text-zinc-400 text-zinc-700 flex flex-row items-center gap-1">
            {info.points}
            <BadgeCent className="w-4 h-4" />
          </p>
        </div>
        <h2 className="text-zinc-500 dark:text-zinc-400">{info.desc}</h2>
      </div>
    </div>
  )
}