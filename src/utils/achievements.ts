import {
  ArrowRightLeft,
  BookOpen,
  DoorOpen,
  Gem,
  LibraryBig,
  Link2,
  type LucideIcon,
  Smile,
} from "lucide-react";
import { toast } from "sonner";
import type { AchievementProps } from "@/components/ui/achievement";

export enum AchievementEnum {
  WELCOME,
  LINK_EXPLORER,
  LINKIN_PARK,
  ABRAHAM_LINKIN,
  NEW_READER,
  NOVICE_READER,
  BOOKWORM,
  OBSESSED,
  SWITCH_IT_UP,
  SEE_I_LIKE_TO_PARTY,
  A_GIRLS_BEST_FRIEND,
}

export type AchievementInfo = {
  title: string;
  desc: string;
  flavor?: string;
  points: number;
  icon: LucideIcon;
  color: string;
  obfuscated?: boolean;
};

type AchievementUserInfo = {
  unlockedAchievements: boolean[];
  shopPoints: number;
};

const ACHIEVEMENTS_LOCAL_STORAGE_KEY = "achievements";
const ALL_ACHIEVEMENTS: AchievementInfo[] = [
  {
    title: "Welcome!",
    desc: "Visit jacobmoy.com for the first time",
    flavor: "Welcome to my website, enjoy your stay :]",
    points: 5,
    icon: DoorOpen,
    color: "bg-green-400 dark:bg-green-600",
  },
  {
    title: "Link Explorer",
    desc: "Click a link ten times",
    points: 5,
    icon: Link2,
    color: "bg-indigo-400 dark:bg-indigo-600",
  },
  {
    title: "Linkin' Park",
    desc: "Click a link twenty times",
    points: 10,
    icon: Link2,
    color: "bg-violet-400 dark:bg-violet-600",
  },
  {
    title: "Abraham Linkin",
    desc: "Click a link fifty times",
    points: 15,
    icon: Link2,
    color: "bg-purple-400 dark:bg-violet-600",
  },
  {
    title: "New Reader",
    desc: "Read a blog post for the first time",
    flavor: "Welcome to the ramblings of a madman.",
    points: 5,
    icon: BookOpen,
    color: "bg-yellow-400 dark:bg-yellow-600",
  },
  {
    title: "Novice Reader",
    desc: "Read 3 blog posts",
    points: 15,
    icon: BookOpen,
    color: "bg-lime-400 dark:bg-lime-600",
  },
  {
    title: "Bookworm",
    desc: "Read 8 blog posts",
    points: 25,
    icon: BookOpen,
    color: "bg-green-400 dark:bg-green-600",
  },
  {
    title: "Obsessed",
    desc: "Read all blog posts",
    flavor:
      "You either clicked through them all, or have an unhealthy obsession with me. Either way, thanks for checking me out!",
    points: 50,
    icon: LibraryBig,
    color: "bg-emerald-400 dark:bg-emerald-600",
    obfuscated: true,
  },
  {
    title: "Switch it Up",
    desc: "Manually select a new theme",
    flavor: "Prolly switched to dark mode, didn't cha?",
    points: 5,
    icon: ArrowRightLeft,
    color: "bg-rose-400 dark:bg-rose-600",
    obfuscated: true,
  },
  {
    title: "See, I Like to Party",
    desc: "Click a link under the 'fun' category in quick links",
    points: 10,
    icon: Smile,
    color: "bg-yellow-400 dark:bg-yellow-600",
    obfuscated: true,
  },
  {
    title: "A Girl's Best Friend",
    desc: "Find a diamond",
    flavor: "A whole lot easier than Minecraft!",
    points: 20,
    icon: Gem,
    color: "bg-sky-400 dark:bg-sky-600",
    obfuscated: true,
  },
];

class AchievementsHandler {
  private listeners: Set<() => void> = new Set();

  private userInfo: AchievementUserInfo = {
    unlockedAchievements: new Array(ALL_ACHIEVEMENTS.length).fill(false),
    shopPoints: 0,
  };

  /**
   * Loads the user's unlocked achievements and shop point balance from local
   * storage.
   */
  public loadUnlockedAchievements(userInfoString: string): void {
    if (userInfoString !== null) {
      const userInfo: AchievementUserInfo = JSON.parse(
        userInfoString,
      ) as AchievementUserInfo;

      this.userInfo.unlockedAchievements = userInfo.unlockedAchievements;
      this.userInfo.shopPoints = userInfo.shopPoints;

      this.saveAchievements();
    }
  }

  /**
   * Saves the unlocked achievements and shop point balance to the user's
   * local storage.
   */
  private saveAchievements(): void {
    const userInfoString: string = JSON.stringify(this.userInfo);

    localStorage.setItem(ACHIEVEMENTS_LOCAL_STORAGE_KEY, userInfoString);
    this.notifyListeners();
  }

  /**
   * Unlocks an achievement for the user, awarding points updating saved
   * achievements.
   * @param achievement The achievement to unlock
   */
  public unlockAchievement(achievement: AchievementEnum): void {
    console.log("Attempted to unlock achievement", achievement);

    if (!this.userInfo.unlockedAchievements[achievement]) {
      const pointsToAward: number | undefined =
        ALL_ACHIEVEMENTS.at(achievement)?.points;

      this.userInfo.unlockedAchievements[achievement] = true;
      this.userInfo.shopPoints += pointsToAward ?? 0;
      this.saveAchievements();

      console.log("Unlocked achievement ", achievement);
      toast("Unlocked achievement");
    }
  }

  public fetchAchievements(): AchievementProps[] {
    return this.userInfo.unlockedAchievements.map((unlocked, idx) => ({
      info: ALL_ACHIEVEMENTS[idx],
      unlocked: unlocked,
    }));
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const achievements = new AchievementsHandler();
