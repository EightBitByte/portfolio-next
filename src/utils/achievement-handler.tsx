import {
  ArrowRightLeft,
  BookOpen,
  DoorOpen,
  Gem,
  LibraryBig,
  Link2,
  type LucideIcon,
  Smile,
  Terminal,
  Trophy,
} from "lucide-react";
import type { AchievementProps } from "@/components/ui/achievement";
import { toast } from "sonner";
import AchievementUnlockToast from "@/components/ui/achievement-unlock-toast";
import { shop } from "./shop-handler";

export type AchievementInfo = {
  title: string;
  desc: string;
  flavor?: string;
  points: number;
  icon: LucideIcon;
  rarity: AchievementRarity;
  obfuscated?: boolean;
  secret?: boolean;
};

export const ACHIEVEMENT_DATA: {[key: string] : AchievementInfo} = {
  WELCOME: {
    title: "Welcome!",
    desc: "Visit jacobmoy.com for the first time",
    flavor: "Welcome to my website, enjoy your stay :]",
    points: 5,
    icon: DoorOpen,
    rarity: "COMMON",
  },
  LINK_EXPLORER: {
    title: "Link Explorer",
    desc: "Click a link ten times",
    points: 5,
    icon: Link2,
    rarity: "COMMON",
  },
  LINKIN_PARK: {
    title: "Linkin' Park",
    desc: "Click a link twenty times",
    points: 10,
    icon: Link2,
    rarity: "UNCOMMON",
  },
  ABRAHAM_LINKIN: {
    title: "Abraham Linkin",
    desc: "Click a link fifty times",
    points: 15,
    icon: Link2,
    rarity: "RARE",
  },
  NEW_READER: {
    title: "New Reader",
    desc: "Read a blog post for the first time",
    flavor: "Welcome to the ramblings of a madman.",
    points: 5,
    icon: BookOpen,
    rarity: "COMMON"
  },
  NOVICE_READER: {
    title: "Novice Reader",
    desc: "Read 3 blog posts",
    points: 15,
    icon: BookOpen,
    rarity: "UNCOMMON"
  },
  // BOOKWORM: {
  //   title: "Bookworm",
  //   desc: "Read 8 blog posts",
  //   points: 25,
  //   icon: BookOpen,
  //   color: "bg-green-400 dark:bg-green-600",
  // },
  OBSESSED: {
    title: "Obsessed",
    desc: "Read all blog posts",
    flavor: "You either clicked through them all, or have an unhealthy obsession with me. Either way, thanks for checking me out!",
    points: 50,
    icon: LibraryBig,
    obfuscated: true,
    rarity: "RARE" 
  },
  SWITCH_IT_UP: {
    title: "Switch it Up",
    desc: "Manually select a theme",
    flavor: "Prolly switched to dark mode, didn't cha?",
    points: 5,
    icon: ArrowRightLeft,
    obfuscated: true,
    rarity: "COMMON",
  },
  SEE_I_LIKE_TO_PARTY: {
    title: "See, I Like to Party",
    desc: "Click a link under the 'fun' category in quick links",
    points: 10,
    icon: Smile,
    obfuscated: true,
    rarity: "RARE"
  },
  A_GIRLS_BEST_FRIEND: {
    title: "A Girl's Best Friend",
    desc: "Find a diamond",
    flavor: "A whole lot easier than Minecraft!",
    points: 20,
    icon: Gem,
    obfuscated: true,
    rarity: "EPIC",
  },
  COMPLETIONIST: {
    title: "Completionist",
    desc: "Unlock all achievements",
    flavor: "A tribute to your dedication. Thanks for sticking around!",
    points: 100,
    icon: Trophy,
    rarity: "LEGENDARY"
  },
  LEET_HAXOR: {
    title: "L33T H4X0R",
    desc: "Illegitimately unlock an achievement",
    flavor: "Why'd you have to go and do that? Good job, though.",
    points: 200,
    icon: Terminal,
    rarity: "LEGENDARY",
    secret: true,
  },
} as const;

export type AchievementId = keyof typeof ACHIEVEMENT_DATA;
export type AchievementRarity = 
  "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY";

type AchievementProgress = {
  blogPostsRead: boolean[];
  linksClicked: number;
}

type AchievementUserInfo = {
  unlockedAchievements: Record<AchievementId, boolean>;
  achievementProgress: AchievementProgress;
};

const ACHIEVEMENTS_LOCAL_STORAGE_KEY = "achievements";

class AchievementsHandler {
  private listeners: Set<() => void> = new Set();
  private userInfo: AchievementUserInfo;
  private numPosts: number = 0;
  private isInitialized = false;
  private readyPromise: Promise<void>;
  private resolveReadyPromise!: () => void;

  constructor() {
    this.readyPromise = new Promise<void>((resolve) => {
      this.resolveReadyPromise = resolve;
    });

    const initialUnlockedStatus = Object.keys(ACHIEVEMENT_DATA).reduce(
      (acc, key) => {
        acc[key as AchievementId] = false;
        return acc;
      },
      {} as Record<AchievementId, boolean>,
    );

    this.userInfo = {
      unlockedAchievements: initialUnlockedStatus,
      achievementProgress: {
        blogPostsRead: [],
        linksClicked: 0,
      }
    };
  }

  public init(numPosts : number) {
    if (this.isInitialized)
      return;

    this.numPosts = numPosts;
    this.userInfo.achievementProgress.blogPostsRead = 
      new Array(numPosts).fill(false);

    const userInfoString = localStorage.getItem(ACHIEVEMENTS_LOCAL_STORAGE_KEY);
    if (userInfoString) 
      achievements.loadUnlockedAchievements(userInfoString);
    this.isInitialized = true;
    this.resolveReadyPromise();
  }

  /**
   * Loads the user's unlocked achievements and shop point balance
   * from local storage.
   */
  public loadUnlockedAchievements(userInfoString: string | null): void {
    this.checkCheating();

    if (userInfoString) {
      let storedInfo: Partial<AchievementUserInfo> | undefined = undefined;
      try {
        storedInfo = JSON.parse(userInfoString);
      } catch {
        return;
      }

      // Merge unlocked achievements, keeping new ones as false
      if (storedInfo?.unlockedAchievements) {
        this.userInfo.unlockedAchievements = {
          ...this.userInfo.unlockedAchievements,
          ...storedInfo.unlockedAchievements,
        };
      }

      // Merge achievement progress safely
      if (storedInfo?.achievementProgress) {
        if (typeof storedInfo.achievementProgress.linksClicked === 'number') {
          this.userInfo.achievementProgress.linksClicked = storedInfo.achievementProgress.linksClicked;
        }
        if (Array.isArray(storedInfo.achievementProgress.blogPostsRead)) {
          const newBlogPostsRead = new Array(this.numPosts);
          for (let i = 0; i < storedInfo.achievementProgress.blogPostsRead.length; i++) {
            if (i < newBlogPostsRead.length && storedInfo.achievementProgress.blogPostsRead[i]) {
              newBlogPostsRead[i] = true;
            }
          }
          this.userInfo.achievementProgress.blogPostsRead = newBlogPostsRead;
        }
      }
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
  public async unlockAchievement(achievementId: AchievementId): Promise<void> {
    if (achievementId !== "WELCOME")
      await this.readyPromise;

    if (!this.userInfo.unlockedAchievements[achievementId]) {
      const pointsToAward = ACHIEVEMENT_DATA[achievementId].points;

      this.userInfo.unlockedAchievements[achievementId] = true;
      shop.awardPoints(pointsToAward)
      this.saveAchievements();

      toast(<AchievementUnlockToast info={ACHIEVEMENT_DATA[achievementId]}/>);

      this.checkCompletionistAchievement()
    }
  }

  private async checkReadingAchievements(): Promise<void> {
    const readCount = this.userInfo.achievementProgress.blogPostsRead.filter(Boolean).length;

    if (readCount >= 1) 
      await this.unlockAchievement('NEW_READER');
    if (readCount >= 3)
      await this.unlockAchievement('NOVICE_READER');
    // if (readCount >= 8)
    //   await this.unlockAchievement('BOOKWORM');
    if (this.numPosts > 0 && readCount === this.numPosts) 
      await this.unlockAchievement('OBSESSED');
  }

  public async markBlogPostAsRead(postId: number): Promise<void> {
    await this.readyPromise;

    const idInBounds = postId >= 0 && 
      postId < this.userInfo.achievementProgress.blogPostsRead.length;

    if (idInBounds && !this.userInfo.achievementProgress.blogPostsRead[postId]) {
      this.userInfo.achievementProgress.blogPostsRead[postId] = true;
      await this.checkReadingAchievements();
      this.saveAchievements();
    }
  }

  public trackLinkClicks(isFunLink: boolean): void {
    if (!this.isInitialized) {
      this.readyPromise.then(() => this.trackLinkClicks(isFunLink))
      return;
    }

    this.userInfo.achievementProgress.linksClicked += 1;
    this.saveAchievements();

    if (isFunLink)
      this.unlockAchievement("SEE_I_LIKE_TO_PARTY")
    if (this.userInfo.achievementProgress.linksClicked >= 10)
      this.unlockAchievement("LINK_EXPLORER")
    if (this.userInfo.achievementProgress.linksClicked >= 20)
      this.unlockAchievement("LINKIN_PARK")
    if (this.userInfo.achievementProgress.linksClicked >= 50)
      this.unlockAchievement("ABRAHAM_LINKIN")
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
    return () => this.listeners.delete(listener);
  }

  private getNumUnlockedAchievements(): number {
    return Object.values(this.userInfo.unlockedAchievements)
      .filter((unlocked) => unlocked)
      .length;
  }

  public async getNumAchievements(): Promise<number> {
    await this.readyPromise;

    return Object.values(ACHIEVEMENT_DATA)
      .filter((achievement) => (achievement.secret != true))
      .length;
  }

  private async checkCompletionistAchievement(): Promise<void> {
    const numAchievements = await this.getNumAchievements();
    const hasUnlockedAllAchievements: boolean 
      = this.getNumUnlockedAchievements() >= numAchievements - 1;

    console.log(this.getNumUnlockedAchievements(), numAchievements)
    if (hasUnlockedAllAchievements) 
      await this.unlockAchievement("COMPLETIONIST");
  }

  private async checkCheating(): Promise<void> {
    await this.readyPromise;
    const numAchievements = await this.getNumAchievements();

    const completionistCheater = this.getNumUnlockedAchievements() != numAchievements && this.userInfo.unlockedAchievements["COMPLETIONIST"];
    const linkCheater = (this.userInfo.achievementProgress.linksClicked < 10 && this.userInfo.unlockedAchievements["LINK_EXPLORER"])
                        || (this.userInfo.achievementProgress.linksClicked < 20 && this.userInfo.unlockedAchievements["LINKIN_PARK"])
                        || (this.userInfo.achievementProgress.linksClicked < 50 && this.userInfo.unlockedAchievements["ABRAHAM_LINKIN"])
    const numBlogPostsRead = this.userInfo.achievementProgress.blogPostsRead.filter((post) => post).length;
    const blogCheater = (numBlogPostsRead == 0 && this.userInfo.unlockedAchievements["NEW_READER"])
                        || (numBlogPostsRead < 3 && this.userInfo.unlockedAchievements["NOVICE_READER"])
                        || (numBlogPostsRead < this.userInfo.achievementProgress.blogPostsRead.length && this.userInfo.unlockedAchievements["OBSESSED"]);
    
    if (completionistCheater || linkCheater || blogCheater)
        await this.unlockAchievement("LEET_HAXOR");

  }
}

export const achievements = new AchievementsHandler();