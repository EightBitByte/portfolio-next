enum AchievementEnum {
  A_GIRLS_BEST_FRIEND,
  LINK_EXPLORER,
  LINKIN_PARK,
  ABRAHAM_LINKIN,
  SWITCH_IT_UP,
  NEW_READER,
  NOVICE_READER,
  BOOKWORM,
  OBSESSED,
}

type AchievementInfo = {
  title: string;
  desc: string;
  flavor?: string;
  points: number;
};

type AchievementUserInfo = {
  unlockedAchievements: AchievementEnum[];
  shopPoints: number;
};

const ACHIEVEMENTS_LOCAL_STORAGE_KEY = "achievements";
const ALL_ACHIEVEMENTS: AchievementInfo[] = [
  {
    title: "A Girl's Best Friend",
    desc: "Find a diamond",
    flavor: "A whole lot easier than Minecraft!",
    points: 20,
  },
  {
    title: "Link Explorer",
    desc: "Click a link ten times",
    points: 5,
  },
  {
    title: "Linkin' Park",
    desc: "Click a link twenty times",
    points: 10,
  },
  {
    title: "Abraham Linkin",
    desc: "Click a link fifty times",
    points: 15,
  },
  {
    title: "Switch it Up",
    desc: "Manually select a new theme",
    flavor: "Prolly switched to dark mode, didn't cha?",
    points: 5,
  },
];

class AchievementsHandler {
  private userInfo: AchievementUserInfo = {
    unlockedAchievements: [],
    shopPoints: 0,
  };

  constructor() {
    this.loadUnlockedAchievements();
  }

  /**
   * Loads the user's unlocked achievements and shop point balance from local
   * storage.
   */
  private loadUnlockedAchievements(): void {
    const userInfoString: string | null = localStorage.getItem(
      ACHIEVEMENTS_LOCAL_STORAGE_KEY,
    );

    if (userInfoString !== null) {
      const userInfo: AchievementUserInfo = JSON.parse(
        userInfoString,
      ) as AchievementUserInfo;

      this.userInfo.unlockedAchievements = userInfo.unlockedAchievements;
      this.userInfo.shopPoints = userInfo.shopPoints;
    }
  }

  /**
   * Saves the unlocked achievements and shop point balance to the user's
   * local storage.
   */
  private saveAchievements(): void {
    const userInfoString: string = JSON.stringify(this.userInfo);

    localStorage.setItem(ACHIEVEMENTS_LOCAL_STORAGE_KEY, userInfoString);
  }

  /**
   * Unlocks an achievement for the user, awarding points updating saved
   * achievements.
   * @param achievement The achievement to unlock
   */
  public unlockAchievement(achievement: AchievementEnum): void {
    if (this.userInfo.unlockedAchievements.includes(achievement)) {
      const pointsToAward: number | undefined =
        ALL_ACHIEVEMENTS.at(achievement)?.points;

      this.userInfo.unlockedAchievements.push(achievement);
      this.userInfo.shopPoints += pointsToAward ?? 0;
      this.saveAchievements();
    }
  }
}
