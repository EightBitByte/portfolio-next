'use client';
import { shop, SHOP_DATA, ShopId } from "@/utils/shop-handler";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";
import { THEME_DATA } from "./theme-toggle";
import ThemeBox from "./theme-box";
import { toTitleCase } from "@/utils/utils";
import { Button } from "./button";
import { Check, Lock, Paintbrush } from "lucide-react";
import { achievements } from "@/utils/achievement-handler";

export function MobileThemeContent() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [unlockedThemes, setUnlockedThemes] = useState<Record<ShopId, boolean>>();

  useEffect(() => {
    setMounted(true);
    setUnlockedThemes(shop.getPurchasedItems());

    const shopUnsubscribe = shop.subscribe(() => {
      console.log("Shop updated, re-rendering list...");
      setUnlockedThemes({... shop.getPurchasedItems()})
    });

    return () => {
      shopUnsubscribe();
    }
  }, [])

  if (!mounted) 
    return null;

  return (
    <div className="flex flex-col gap-4">
      {Object.values(THEME_DATA).map((themeInstance, idx) => {
        const isUnlocked: boolean = ["light", "dark"].includes(themeInstance.id)
                                    || unlockedThemes![themeInstance.id.toUpperCase() as ShopId] == true;
        
        const isSelected: boolean = isUnlocked && theme == themeInstance.id;

        return (
          <Fragment key={themeInstance.id}>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 items-center">
                <ThemeBox theme={themeInstance.id} colors={themeInstance.colors}/>
                <div>
                  <h1 className="font-bold">{themeInstance.displayName ?? toTitleCase(themeInstance.id)}</h1>
                  <h2>{themeInstance.desc}</h2>
                </div>
              </div>
              <Button 
                variant={isSelected ? "selected" : "outline"} 
                size="icon" 
                onClick={() => {
                  setTheme(themeInstance.id);
                  achievements.unlockAchievement("SWITCH_IT_UP");
                }}
                disabled={!isUnlocked}
              >
                {!isUnlocked && <Lock/>}
                {isUnlocked && !isSelected && <Paintbrush/>}
                {isSelected && <Check/>}
              </Button>
            </div>
            {idx != Object.keys(THEME_DATA).length - 1 && <div className="my-4 bg-foreground/60 w-full min-h-[1px]"/>}
          </Fragment>
        )
      }
      )}
    </div>
  )
}

export function MobileAchievementContent() {
  return (
    <div>
    </div>
  )
}

export function MobileShopContent() {
  return (
    <div>
    </div>
  )
}