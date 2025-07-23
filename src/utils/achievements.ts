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

export type AchievementInfo = {
  title: string;
  desc: string;
  flavor?: string;
  points: number;
  icon: LucideIcon;
  color: string;
  obfuscated?: boolean;
};

export const ACHIEVEMENT_DATA = {
  WELCOME: {
    title: "Welcome!",
    desc: "Visit jacobmoy.com for the first time",
    flavor: "Welcome to my website, enjoy your stay :]",
    points: 5,
    icon: DoorOpen,
    color: "bg-green-400 dark:bg-green-600",
  },
  LINK_EXPLORER: {
    title: "Link Explorer",
    desc: "Click a link ten times",
    points: 5,
    icon: Link2,
    color: "bg-indigo-400 dark:bg-indigo-600",
  },
  LINKIN_PARK: {
    title: "Linkin' Park",
    desc: "Click a link twenty times",
    points: 10,
    icon: Link2,
    color: "bg-violet-400 dark:bg-violet-600",
  },
  ABRAHAM_LINKIN: {
    title: "Abraham Linkin",
    desc: "Click a link fifty times",
    points: 15,
    icon: Link2,
    color: "bg-purple-400 dark:bg-violet-600",
  },
  NEW_READER: {
    title: "New Reader",
    desc: "Read a blog post for the first time",
    flavor: "Welcome to the ramblings of a madman.",
    points: 5,
    icon: BookOpen,
    color: "bg-yellow-400 dark:bg-yellow-600",
  },
  NOVICE_READER: {
    title: "Novice Reader",
    desc: "Read 3 blog posts",
    points: 15,
    icon: BookOpen,
    color: "bg-lime-400 dark:bg-lime-600",
  },
  BOOKWORM: {
    title: "Bookworm",
    desc: "Read 8 blog posts",
    points: 25,
    icon: BookOpen,
    color: "bg-green-400 dark:bg-green-600",
  },
  OBSESSED: {
    title: "Obsessed",
    desc: "Read all blog posts",
    flavor:
      "You either clicked through them all, or have an unhealthy obsession with me. Either way, thanks for checking me out!",
    points: 50,
    icon: LibraryBig,
    color: "bg-emerald-400 dark:bg-emerald-600",
    obfuscated: true,
  },
  SWITCH_IT_UP: {
    title: "Switch it Up",
    desc: "Manually select a new theme",
    flavor: "Prolly switched to dark mode, didn't cha?",
    points: 5,
    icon: ArrowRightLeft,
    color: "bg-rose-400 dark:bg-rose-600",
    obfuscated: true,
  },
  SEE_I_LIKE_TO_PARTY: {
    title: "See, I Like to Party",
    desc: "Click a link under the 'fun' category in quick links",
    points: 10,
    icon: Smile,
    color: "bg-yellow-400 dark:bg-yellow-600",
    obfuscated: true,
  },
  A_GIRLS_BEST_FRIEND: {
    title: "A Girl's Best Friend",
    desc: "Find a diamond",
    flavor: "A whole lot easier than Minecraft!",
    points: 20,
    icon: Gem,
    color: "bg-sky-400 dark:bg-sky-600",
    obfuscated: true,
  },
} as const;

export type AchievementId = keyof typeof ACHIEVEMENT_DATA;

type AchievementUserInfo = {
  unlockedAchievements: Record<AchievementId, boolean>;
  shopPoints: number;
};

const ACHIEVEMENTS_LOCAL_STORAGE_KEY = "achievements";

class AchievementsHandler {
  private listeners: Set<() => void> = new Set();

  private userInfo: AchievementUserInfo;

  constructor() {
    const initialUnlockedStatus = Object.keys(ACHIEVEMENT_DATA).reduce(
      (acc, key) => {
        acc[key as AchievementId] = false;
        return acc;
      },
      {} as Record<AchievementId, boolean>,
    );

    this.userInfo = {
      unlockedAchievements: initialUnlockedStatus,
      shopPoints: 0,
    };
  }

  /**
   * Loads the user's unlocked achievements and shop point balance
   * from local storage.
   */
  public loadUnlockedAchievements(userInfoString: string | null): void {
    if (userInfoString) {
      const storedInfo: Partial<AchievementUserInfo> =
        JSON.parse(userInfoString);

      this.userInfo = {
        ...this.userInfo,
        ...storedInfo,
        unlockedAchievements: {
          ...this.userInfo.unlockedAchievements,
          ...storedInfo.unlockedAchievements,
        },
      };

      this.saveAchievements();
    }
  }

  /**
   * Saves the unlocked achievements and shop point balance to the user's local
   * storage.
   */
  private saveAchievements(): void {
    const userInfoString: string = JSON.stringify(this.userInfo);
    localStorage.setItem(ACHIEVEMENTS_LOCAL_STORAGE_KEY, userInfoString);
    this.notifyListeners();
  }

  /**
   * Unlocks an achievement for the user, awarding points and updating
   * saved achievements.
   * @param achievementId The ID of the achievement to unlock
   */
  public unlockAchievement(achievementId: AchievementId): void {
    console.log("Attempted to unlock achievement", achievementId);

    if (!this.userInfo.unlockedAchievements[achievementId]) {
      const pointsToAward = ACHIEVEMENT_DATA[achievementId].points;

      this.userInfo.unlockedAchievements[achievementId] = true;
      this.userInfo.shopPoints += pointsToAward;
      this.saveAchievements();

      console.log("Unlocked achievement ", achievementId);
      toast(`Unlocked: ${ACHIEVEMENT_DATA[achievementId].title}`);
    }
  }

  public fetchAchievements(): AchievementProps[] {
    return (Object.keys(ACHIEVEMENT_DATA) as AchievementId[]).map((id) => ({
      info: ACHIEVEMENT_DATA[id],
      unlocked: this.userInfo.unlockedAchievements[id],
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
