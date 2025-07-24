import { ShopItemProps } from "@/components/ui/shop-item";

export const SHOP_DATA = {
  CATPUCCIN_MOCHA: {
    title: "Catpuccin Mocha",
    desc: "A cozy dark theme.",
    price: 25,
    colors: ["catpuccin-mocha-text", "catpuccin-mocha-base", "catpuccin-mocha-blue"],
  },
  CATPUCCIN_LATTE: {
    title: "Catpuccin Latte",
    desc: "A cozy light theme.",
    price: 25,
    colors: ["catpuccin-latte-text", "catpuccin-latte-base", "catpuccin-latte-rosewater"],
  },
  HABAMAX: {
    title: "Habamax",
    desc: "A neovim-inspired theme.",
    price: 25,
    colors: ["habamax-text", "habamax-base", "habamax-blue"],
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
  private points: number = 0;

  constructor() {
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

  public fetchItems(): ShopItemProps[] {
    return (Object.keys(SHOP_DATA) as ShopId[]).map((id) => ({
      ...SHOP_DATA[id],
      purchased: false,
    }));
  }

  public saveShopInfo(): void {
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


  public awardPoints(points: number): void {
    this.points += points;
  }


  public purchase(shopId: ShopId): void {
    const price: number = SHOP_DATA[shopId].price;

    if (price > this.points) {
      // Show a toast with insufficient points
      console.log("Insufficient points.");
    } else {
      this.points -= price;
      this.userInfo.purchasedItems[shopId] = true;
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
}

export const shop = new ShopHandler();