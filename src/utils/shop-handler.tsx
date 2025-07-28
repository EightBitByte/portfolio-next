import { ShopItemProps } from "@/components/ui/shop-item";
import { X } from "lucide-react";
import { toast } from "sonner";
import { achievements } from "./achievement-handler";

export const SHOP_DATA = {
  MOCHA: {
    title: "Catpuccin Mocha",
    desc: "A cozy dark theme.",
    price: 25,
    colors: ["catppuccin-color-text", "catppuccin-color-base", "flavor"],
  },
  LATTE: {
    title: "Catpuccin Latte",
    desc: "A cozy light theme.",
    price: 25,
    colors: ["catppuccin-color-text", "catppuccin-color-base", "flavor"],
  },
  HABAMAX: {
    title: "Habamax",
    desc: "A neovim-inspired theme.",
    price: 25,
    colors: ["foreground", "background", "flavor"],
  },
}

const SHOP_LOCAL_STORAGE_KEY = "shop";

export type ShopId = keyof typeof SHOP_DATA;

type ShopUserInfo = {
  points: number,
  purchasedItems: Record<ShopId, boolean>,
}

class ShopHandler {
  private listeners: Set<() => void> = new Set();
  private userInfo: ShopUserInfo;
  private isInitialized: boolean = false;
  private readyPromise: Promise<void>;
  private resolveReadyPromise!: () => void;

  constructor() {
    this.readyPromise = new Promise<void>((resolve) => {
      this.resolveReadyPromise = resolve;
    });

    const purchasedItems = Object.keys(SHOP_DATA).reduce(
      (acc, key) => {
        acc[key as ShopId] = false;
        return acc;
      },
      {} as Record<ShopId, boolean>,
    );

    this.userInfo = {
      points: 0, 
      purchasedItems: purchasedItems,
    }
  }

  public init() {
    if (this.isInitialized)
      return;

    const userInfoString = localStorage.getItem(SHOP_LOCAL_STORAGE_KEY) ;
    if (userInfoString)
      this.loadShopInfo(userInfoString);

    this.isInitialized = true;
    this.resolveReadyPromise();
  }

  public fetchItems(): ShopItemProps[] {
    return (Object.keys(SHOP_DATA) as ShopId[]).map((id) => ({
      id,
      ...SHOP_DATA[id],
      purchased: this.userInfo.purchasedItems[id],
    }));
  }

  public saveShopInfo(): void {
    if (typeof window === 'undefined')
      return;

    const shopInfoString: string = JSON.stringify(this.userInfo);
    localStorage.setItem(SHOP_LOCAL_STORAGE_KEY, shopInfoString);
    this.notifyListeners();
  }

  public loadShopInfo(shopInfoString: string | null): void {
    if (shopInfoString) {
      const storedInfo: Partial<ShopUserInfo> = JSON.parse(shopInfoString);

      if (storedInfo.purchasedItems)
        this.userInfo.purchasedItems = {
          ...this.userInfo.purchasedItems,
          ...storedInfo.purchasedItems,
        }

      if (typeof storedInfo.points === 'number') 
        this.userInfo.points = storedInfo.points;
    
      this.saveShopInfo();
    }
  }

  public async awardPoints(points: number): Promise<void> {
    await this.readyPromise;
    this.userInfo.points += points;

    if (this.userInfo.points > 200)
      achievements.unlockAchievement("DELAYED_GRATIFICATION");

    this.saveShopInfo();
  }

  public purchase(shopId: ShopId): void {
    const price: number = SHOP_DATA[shopId].price;

    if (price > this.userInfo.points) {
      toast(
        <div className="flex flex-row gap-2 items-center">
          <X className="h-6 w-6"/>
          <p className="text-lg">Insufficient points.</p>
        </div>
      )
    } else {
      this.userInfo.points -= price;
      this.userInfo.purchasedItems[shopId] = true;
      this.checkPurchaseAchievements();
      this.saveShopInfo();
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener())
  }


  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }


  public getPoints(): number {
    return this.userInfo.points;
  }


  public getPurchasedItems(): Record<ShopId, boolean> {
    return this.userInfo.purchasedItems;
  }


  private checkPurchaseAchievements(): void {
    const numItemsPurchased: number = Object
      .values(this.userInfo.purchasedItems)
      .filter((purchased) => purchased)
      .length;
    const totalAvailableItems: number = Object
      .keys(this.userInfo.purchasedItems)
      .length;

    if (numItemsPurchased > 0)
      achievements.unlockAchievement("LIGHT_SHOPPING");
    if (numItemsPurchased === totalAvailableItems)
      achievements.unlockAchievement("BIG_SPENDER");

  }
}

export const shop = new ShopHandler();