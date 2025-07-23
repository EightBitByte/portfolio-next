'use client';

import Achievement, { AchievementProps } from "./achievement"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription} from "./dialog"
import { Fragment, useState } from "react"
import { cn } from "@/lib/utils";
import ShopEntry from "./shop-entry";

export default function AchievementDialogContent({
  fetchedAchievements
}: {
  fetchedAchievements: AchievementProps[]
}) {
  let [onShop, setOnShop] = useState<boolean>(false);

  return (
    <DialogContent className="max-w-[425px] max-h-[725px] flex flex-col p-0">
      <DialogHeader className="px-4 pt-4 pb-2">
        <DialogTitle className="flex flex-row gap-2">
          <p 
            className={cn(
              "hover:cursor-pointer select-none",
              onShop && "text-zinc-500 dark:text-zinc-400"
            )}
            onClick={() => setOnShop(false)}
          >
            Achievements
          </p>
          <p className="text-zinc-500 select-none"
          >
            /
          </p>
          <p 
            className={cn(
              "hover:cursor-pointer select-none",
              !onShop && "text-zinc-500 dark:text-zinc-400"
            )}
            onClick={() => setOnShop(true)}
          >
            Shop
          </p>
        </DialogTitle>
      </DialogHeader>
      <DialogDescription hidden>
        All locked and unlocked achievements for jacobmoy.com.
      </DialogDescription>
      <div className="flex flex-col overflow-y-scroll flex-grow px-6 pb-4">
        {!onShop && fetchedAchievements.map((props, idx) => 
          <Fragment key={props.info.title}>
            <Achievement
              info={props.info}
              unlocked={props.unlocked}
            />
            {idx != fetchedAchievements.length - 1 &&
            <div className="my-6 dark:bg-zinc-400 bg-zinc-500 w-full min-h-[1px]"/>}
          </Fragment>
        )}
        {onShop && 
          <>
          <ShopEntry
            title="Catpuccin Dark"
            desc="A whole new theme."
            price={25}
            purchased={true}
          />
          <div className="my-6 dark:bg-zinc-400 bg-zinc-500 w-full min-h-[1px]"/>
          </>
        }
      </div>
    </DialogContent>
  )
}