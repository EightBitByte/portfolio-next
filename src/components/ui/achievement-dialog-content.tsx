'use client';

import Achievement, { AchievementProps } from "./achievement"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription} from "./dialog"
import { Fragment, useState, useEffect } from "react"
import { cn } from "@/utils/utils";
import ShopItem from "./shop-item";
import { achievements } from "@/utils/achievement-handler";
import { ShopItemProps } from "./shop-item";
import { shop } from "@/utils/shop-handler";
import { BadgeCent } from "lucide-react";

export default function AchievementDialogContent() {
  const [onShop, setOnShop] = useState<boolean>(false);
  const [fetchedAchievements, setFetchedAchievements] = useState<AchievementProps[]>([]);
  const [fetchedShopItems, setFetchedShopItems] = useState<ShopItemProps[]>([])

  useEffect(() => {
    setFetchedAchievements(achievements.fetchAchievements());
    setFetchedShopItems(shop.fetchItems())

    const achievementUnsubscribe = achievements.subscribe(() => {
      console.log("Achievements updated, re-rendering list...");
      setFetchedAchievements(achievements.fetchAchievements());
    });

    const shopUnsubscribe = shop.subscribe(() => {
      console.log("Shop updated, re-rendering list...");
      setFetchedShopItems(shop.fetchItems());
    })

    return () => {
      achievementUnsubscribe();
      shopUnsubscribe();
    }
  }, [])

  return (
    <DialogContent className="max-w-[425px] max-h-[725px] flex flex-col p-0">
      <DialogHeader className="px-4 pt-4 pb-2">
        <DialogTitle className="flex flex-row gap-2">
          <p 
            className={cn(
              "hover:cursor-pointer hover:underline select-none",
              onShop && "text-foreground/50"
            )}
            onClick={() => setOnShop(false)}
          >
            Achievements
          </p>
          <p className="text-foreground/50 select-none"
          >
            /
          </p>
          <p 
            className={cn(
              "hover:cursor-pointer hover:underline select-none",
              !onShop && "text-foreground/50"
            )}
            onClick={() => setOnShop(true)}
          >
            Shop
          </p>
          <p className="pl-2 font-normal text-md text-foreground/60 flex flex-row gap-1 items-center">
            {shop.getPoints()}
            <BadgeCent className="w-3 h-3"/>
          </p>
        </DialogTitle>
      </DialogHeader>
      <DialogDescription hidden>
        All locked and unlocked achievements for jacobmoy.com.
      </DialogDescription>
      <div className="flex flex-col overflow-y-scroll flex-grow px-6 pb-8">
        {!onShop && fetchedAchievements.map((props, idx) => 
          <Fragment key={props.info.title}>
            {idx != 0 && (!props.info.secret || (props.info.secret && props.unlocked)) && 
            <div className="my-6 dark:bg-zinc-400 bg-zinc-500 w-full min-h-[1px]"/>}
            <Achievement
              {...props}
            />
          </Fragment>
        )}
        {onShop && fetchedShopItems.map((props, idx) =>
          <Fragment key={props.title}>
            <ShopItem
              {...props}
            />
            {idx != fetchedShopItems.length - 1 &&
            <div className="my-6 dark:bg-zinc-400 bg-zinc-500 w-full min-h-[1px]"/>}
          </Fragment>
        )}
      </div>
    </DialogContent>
  )
}