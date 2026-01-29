import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';
import {
    ArrowRightLeft,
    BookOpen,
    DoorOpen,
    Gem,
    LibraryBig,
    Link2,
    type LucideIcon,
    PiggyBank,
    ShoppingBag,
    Smile,
    Terminal,
    Trophy
} from 'lucide-react';
import React from 'react';
import AchievementUnlockToast from '@/components/ui/achievement-unlock-toast';

// --- DATA DEFINITIONS ---

export type AchievementRarity = "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY";

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

export const ACHIEVEMENT_DATA: { [key: string]: AchievementInfo } = {
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
        rarity: "COMMON",
    },
    NOVICE_READER: {
        title: "Novice Reader",
        desc: "Read 3 blog posts",
        points: 15,
        icon: BookOpen,
        rarity: "UNCOMMON",
    },
    OBSESSED: {
        title: "Obsessed",
        desc: "Read all blog posts",
        flavor: "You either clicked through them all, or have an unhealthy obsession with me. Either way, thanks for checking me out!",
        points: 50,
        icon: LibraryBig,
        obfuscated: true,
        rarity: "RARE",
    },
    LIGHT_SHOPPING: {
        title: "Light Shopping",
        desc: "Purchase an item from the shop",
        points: 10,
        icon: ShoppingBag,
        rarity: "UNCOMMON",
    },
    BIG_SPENDER: {
        title: "Big Spender",
        desc: "Purchase all items from the shop",
        flavor: "Thank you for your purchases! Enjoy your curated themes.",
        points: 25,
        icon: ShoppingBag,
        rarity: "RARE",
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
        points: 25,
        icon: Smile,
        obfuscated: true,
        rarity: "RARE"
    },
    A_GIRLS_BEST_FRIEND: {
        title: "A Girl's Best Friend",
        desc: "Find a diamond",
        flavor: "A whole lot easier than Minecraft!",
        points: 50,
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
    DELAYED_GRATIFICATION: {
        title: "Delayed Gratification",
        desc: "Save up 175 credits w/o a purchase",
        flavor: "You do know there's a shop to spend your credits, right?",
        points: 100,
        icon: PiggyBank,
        rarity: "LEGENDARY",
        secret: true,
    }
} as const;

export type AchievementId = keyof typeof ACHIEVEMENT_DATA;

export const SHOP_DATA = {
    MOCHA: {
        title: "Catpuccin Mocha",
        desc: "A cozy dark theme.",
        price: 25,
    },
    LATTE: {
        title: "Catpuccin Latte",
        desc: "A cozy light theme.",
        price: 25,
    },
    HABAMAX: {
        title: "Habamax",
        desc: "A neovim-inspired theme.",
        price: 25,
    },
} as const;

export type ShopId = keyof typeof SHOP_DATA;

// --- STORE TYPES ---

interface GameState {
    // State
    unlockedAchievements: Record<AchievementId, boolean>;
    achievementProgress: {
        blogPostsRead: boolean[];
        linksClicked: number;
        numPosts: number;
    };
    points: number;
    purchasedItems: Record<ShopId, boolean>;

    // Actions
    init: (numPosts: number) => void;
    unlockAchievement: (id: AchievementId) => void;
    markBlogPostAsRead: (postId: number) => void;
    trackLinkClicks: (isFunLink: boolean) => void;
    purchaseItem: (id: ShopId) => boolean;

    // Getters/Computeds (implemented as data or helper functions in components normally, but we can have helpers here)
    isAchievementUnlocked: (id: AchievementId) => boolean;
    isShopItemPurchased: (id: ShopId) => boolean;
}

const INITIAL_UNLOCKED_ACHIEVEMENTS = Object.keys(ACHIEVEMENT_DATA).reduce(
    (acc, key) => {
        acc[key as AchievementId] = false;
        return acc;
    },
    {} as Record<AchievementId, boolean>,
);

const INITIAL_PURCHASED_ITEMS = Object.keys(SHOP_DATA).reduce(
    (acc, key) => {
        acc[key as ShopId] = false;
        return acc;
    },
    {} as Record<ShopId, boolean>,
);

// --- HELPER LOGIC ---

// Helper to check for "Cheating" or suspicious state
const checkForCheating = (state: GameState): boolean => {
    const numUnlocked = Object.values(state.unlockedAchievements).filter(Boolean).length;
    const numTotal = Object.keys(ACHIEVEMENT_DATA).filter(k => !ACHIEVEMENT_DATA[k].secret).length;

    const completionistCheater = numUnlocked !== numTotal && state.unlockedAchievements["COMPLETIONIST"];

    const linkCheater =
        (state.achievementProgress.linksClicked < 10 && state.unlockedAchievements["LINK_EXPLORER"]) ||
        (state.achievementProgress.linksClicked < 20 && state.unlockedAchievements["LINKIN_PARK"]) ||
        (state.achievementProgress.linksClicked < 50 && state.unlockedAchievements["ABRAHAM_LINKIN"]);

    const numRead = state.achievementProgress.blogPostsRead.filter(Boolean).length;
    const blogCheater =
        (numRead === 0 && state.unlockedAchievements["NEW_READER"]) ||
        (numRead < 3 && state.unlockedAchievements["NOVICE_READER"]) ||
        (numRead < state.achievementProgress.numPosts && state.unlockedAchievements["OBSESSED"]);

    return !!(completionistCheater || linkCheater || blogCheater);
};

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            unlockedAchievements: INITIAL_UNLOCKED_ACHIEVEMENTS,
            achievementProgress: {
                blogPostsRead: [],
                linksClicked: 0,
                numPosts: 0,
            },
            points: 0,
            purchasedItems: INITIAL_PURCHASED_ITEMS,

            init: (numPosts: number) => {
                set((state) => {
                    // Resize blog post array if needed or init if empty
                    let newReads = state.achievementProgress.blogPostsRead;
                    if (newReads.length !== numPosts) {
                        // Preserve existing usage if resizing (though normally numPosts is static per build)
                        // Just creating a new array safe for the session
                        const resized = new Array(numPosts).fill(false);
                        for (let i = 0; i < Math.min(newReads.length, numPosts); i++) {
                            resized[i] = newReads[i];
                        }
                        newReads = resized;
                    }

                    return {
                        achievementProgress: {
                            ...state.achievementProgress,
                            numPosts,
                            blogPostsRead: newReads
                        }
                    };
                });

                // Check cheating on load
                if (checkForCheating(get())) {
                    get().unlockAchievement("LEET_HAXOR");
                }
            },

            unlockAchievement: (id) => {
                const state = get();
                if (state.unlockedAchievements[id]) return;

                const info = ACHIEVEMENT_DATA[id];

                // Award points
                const pointsToAdd = info.points;

                set((prev) => ({
                    unlockedAchievements: { ...prev.unlockedAchievements, [id]: true },
                    points: prev.points + pointsToAdd
                }));

                // Show toast
                toast.custom((toastId) =>
                    React.createElement(AchievementUnlockToast, {
                        info: info,
                        id: toastId
                    })
                );

                // Recursive checks
                // Check Delayed Gratification
                const currentState = get();
                if (currentState.points > 175 && Object.values(currentState.purchasedItems).every(p => !p)) {
                    get().unlockAchievement("DELAYED_GRATIFICATION");
                }

                // Check Completionist
                const numUnlocked = Object.values(currentState.unlockedAchievements).filter(Boolean).length;
                const numTotal = Object.values(ACHIEVEMENT_DATA).filter(a => !a.secret).length;
                if (numUnlocked >= numTotal) {
                    get().unlockAchievement("COMPLETIONIST");
                }
            },

            markBlogPostAsRead: (postId) => {
                const state = get();
                if (postId < 0 || postId >= state.achievementProgress.blogPostsRead.length) return;
                if (state.achievementProgress.blogPostsRead[postId]) return;

                // Update read status
                const newReads = [...state.achievementProgress.blogPostsRead];
                newReads[postId] = true;

                set((prev) => ({
                    achievementProgress: {
                        ...prev.achievementProgress,
                        blogPostsRead: newReads
                    }
                }));

                // Check achievements
                const readCount = newReads.filter(Boolean).length;
                const { unlockAchievement, achievementProgress } = get();

                if (readCount >= 1) unlockAchievement('NEW_READER');
                if (readCount >= 3) unlockAchievement('NOVICE_READER');
                if (achievementProgress.numPosts > 0 && readCount === achievementProgress.numPosts) {
                    unlockAchievement('OBSESSED');
                }
            },

            trackLinkClicks: (isFunLink) => {
                set((prev) => ({
                    achievementProgress: {
                        ...prev.achievementProgress,
                        linksClicked: prev.achievementProgress.linksClicked + 1
                    }
                }));

                const { unlockAchievement, achievementProgress } = get();
                const clicks = achievementProgress.linksClicked;

                if (isFunLink) unlockAchievement("SEE_I_LIKE_TO_PARTY");
                if (clicks >= 10) unlockAchievement("LINK_EXPLORER");
                if (clicks >= 20) unlockAchievement("LINKIN_PARK");
                if (clicks >= 50) unlockAchievement("ABRAHAM_LINKIN");
            },

            purchaseItem: (id) => {
                const state = get();
                if (state.purchasedItems[id]) return true; // Already owned

                const item = SHOP_DATA[id];
                if (state.points < item.price) {
                    return false;
                }

                set((prev) => ({
                    points: prev.points - item.price,
                    purchasedItems: { ...prev.purchasedItems, [id]: true }
                }));

                // Check shop achievements
                const currentState = get();
                const numPurchased = Object.values(currentState.purchasedItems).filter(Boolean).length;
                const totalItems = Object.keys(SHOP_DATA).length;

                if (numPurchased > 0) currentState.unlockAchievement("LIGHT_SHOPPING");
                if (numPurchased === totalItems) currentState.unlockAchievement("BIG_SPENDER");

                return true;
            },

            isAchievementUnlocked: (id) => !!get().unlockedAchievements[id],
            isShopItemPurchased: (id) => !!get().purchasedItems[id],
        }),
        {
            name: 'game-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                unlockedAchievements: state.unlockedAchievements,
                achievementProgress: state.achievementProgress,
                points: state.points,
                purchasedItems: state.purchasedItems,
            }),
        }
    )
);
