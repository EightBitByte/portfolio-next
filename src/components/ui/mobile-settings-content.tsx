'use client';
import { shop, SHOP_DATA, ShopId } from "@/utils/shop-handler";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";
import { THEME_DATA } from "./theme-toggle";
import ThemeBox from "./theme-box";
import { toTitleCase } from "@/utils/utils";
import { Button } from "./button";
import { ArrowLeft, ArrowRight, Check, Lock, Paintbrush } from "lucide-react";
import { achievements } from "@/utils/achievement-handler";
import Achievement, { AchievementProps } from "./achievement";

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
  const [fetchedAchievements, setFetchedAchievements] = useState<AchievementProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [maxPages, setMaxPages] = useState<number>(0);
  const achievementsPerPage = 4;

  useEffect(() => {
    setFetchedAchievements(achievements.fetchAchievements());

    const achievementUnsubscribe = achievements.subscribe(() => {
      console.log("Achievements updated, re-rendering list...");
      setFetchedAchievements(achievements.fetchAchievements());
    });

    return () => {
      achievementUnsubscribe();
    };
  }, [])

  useEffect(() => {
    setMaxPages(Math.ceil(fetchedAchievements.length / achievementsPerPage - 1));
  }, [fetchedAchievements])

  return (
    <div>
      {fetchedAchievements
        .slice(page * achievementsPerPage, page * achievementsPerPage + achievementsPerPage)
        .map((props, idx) => 
        <Fragment key={props.info.title}>
          {idx != 0 && (!props.info.secret || (props.info.secret && props.unlocked)) && 
          <div className="my-6 bg-foreground/60 w-full min-h-[1px]"/>}
          <Achievement
            {...props}
          />
        </Fragment>
      )}
      <div className="flex flex-row justify-between items-center mt-6">
        <Button variant="outline" size="icon" onClick={() => setPage(page - 1)} disabled={page == 0}>
          <ArrowLeft/>
        </Button>
        <p>{page + 1}/{maxPages + 1}</p>
        <Button variant="outline" size="icon" onClick={() => setPage(page + 1)} disabled={page == maxPages}>
          <ArrowRight/>
        </Button>
      </div>
    </div>
  )
}

export function MobileShopContent() {
  return (
    <div>
    </div>
  )
}