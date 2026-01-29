'use client';
import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";
import { THEME_DATA } from "./theme-toggle";
import ThemeBox from "./theme-box";
import { toTitleCase } from "@/utils/utils";
import { Button } from "./button";
import { ArrowLeft, ArrowRight, BadgeCent, Check, Lock, Paintbrush } from "lucide-react";
import Achievement, { AchievementProps } from "./achievement";
import ShopItem, { ShopItemProps } from "./shop-item";
import { useGameStore, ACHIEVEMENT_DATA, SHOP_DATA, type ShopId, type AchievementId } from "@/store/game-store";


export function MobileThemeContent() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const unlockedThemes = useGameStore((state) => state.purchasedItems);
  const unlockAchievement = useGameStore((state) => state.unlockAchievement);

  const [page, setPage] = useState<number>(0);
  const [maxPages, setMaxPages] = useState<number>(0);
  const themesPerPage = 3;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMaxPages(Math.ceil(Object.keys(THEME_DATA).length / themesPerPage - 1));
  }, []);

  if (!mounted)
    return null;

  return (
    <div className="flex flex-col gap-4">
      {Object.values(THEME_DATA)
        .slice(page * themesPerPage, page * themesPerPage + themesPerPage)
        .map((themeInstance, idx) => {
          const isUnlocked: boolean = ["light", "dark"].includes(themeInstance.id)
            || unlockedThemes[themeInstance.id.toUpperCase() as ShopId] == true;

          const isSelected: boolean = isUnlocked && theme == themeInstance.id;

          return (
            <Fragment key={themeInstance.id}>
              {idx != 0 && <div className="my-4 bg-foreground/60 w-full min-h-[1px]" />}
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                  <ThemeBox theme={themeInstance.id} colors={themeInstance.colors} />
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
                    unlockAchievement("SWITCH_IT_UP");
                  }}
                  disabled={!isUnlocked}
                >
                  {!isUnlocked && <Lock />}
                  {isUnlocked && !isSelected && <Paintbrush />}
                  {isSelected && <Check />}
                </Button>
              </div>
            </Fragment>
          )
        }
        )}
      <div className="flex flex-row justify-between items-center mt-6">
        <Button variant="outline" size="icon" onClick={() => setPage(page - 1)} disabled={page == 0}>
          <ArrowLeft />
        </Button>
        <p>{page + 1}/{maxPages + 1}</p>
        <Button variant="outline" size="icon" onClick={() => setPage(page + 1)} disabled={page == maxPages}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export function MobileAchievementContent() {
  const unlockedAchievements = useGameStore((state) => state.unlockedAchievements);

  const [page, setPage] = useState<number>(0);
  const [maxPages, setMaxPages] = useState<number>(0);
  const achievementsPerPage = 3;

  const fetchedAchievements: AchievementProps[] = (Object.keys(ACHIEVEMENT_DATA) as AchievementId[]).map((id) => ({
    info: ACHIEVEMENT_DATA[id],
    unlocked: unlockedAchievements[id],
  }));

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
              <div className="my-6 bg-foreground/60 w-full min-h-[1px]" />}
            <Achievement
              {...props}
            />
          </Fragment>
        )}
      <div className="flex flex-row justify-between items-center mt-6">
        <Button variant="outline" size="icon" onClick={() => setPage(page - 1)} disabled={page == 0}>
          <ArrowLeft />
        </Button>
        <p>{page + 1}/{maxPages + 1}</p>
        <Button variant="outline" size="icon" onClick={() => setPage(page + 1)} disabled={page == maxPages}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export function MobileShopContent() {
  const purchasedItems = useGameStore((state) => state.purchasedItems);
  const points = useGameStore((state) => state.points);

  const [page, setPage] = useState<number>(0);
  const [maxPages, setMaxPages] = useState<number>(0);
  const itemsPerPage = 3;

  const fetchedShopItems: ShopItemProps[] = (Object.keys(SHOP_DATA) as ShopId[]).map((id) => ({
    id,
    ...SHOP_DATA[id],
    colors: THEME_DATA[id]?.colors,
    purchased: purchasedItems[id],
  }));

  useEffect(() => {
    setMaxPages(Math.ceil(fetchedShopItems.length / itemsPerPage - 1));
  })

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-1 text-foreground/60 mb-4">
        <h1 className="w-fit">{points}</h1>
        <BadgeCent className="w-4 h-4" />
      </div>
      {fetchedShopItems
        .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
        .map((props, idx) =>
          <Fragment key={props.title}>
            {idx != 0 && <div className="my-6 bg-foreground/60 w-full min-h-[1px]" />}
            <ShopItem
              {...props}
            />
          </Fragment>
        )}
      <div className="flex flex-row justify-between items-center mt-6">
        <Button variant="outline" size="icon" onClick={() => setPage(page - 1)} disabled={page == 0}>
          <ArrowLeft />
        </Button>
        <p>{page + 1}/{maxPages + 1}</p>
        <Button variant="outline" size="icon" onClick={() => setPage(page + 1)} disabled={page == maxPages}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}