import { BadgeCent } from "lucide-react";
import { Button } from "./button";
import ThemeBox from "./theme-box";
import { useGameStore, type ShopId } from "@/store/game-store";

export interface ShopItemProps {
  id: ShopId,
  title: string,
  desc: string,
  price: number,
  colors: string[] | null,
  purchased: boolean,
}

export default function ShopItem({
  id,
  title,
  desc,
  price,
  colors,
  purchased
}: ShopItemProps) {
  const purchaseItem = useGameStore((state) => state.purchaseItem);
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-row gap-2 items-center">
        {colors != null && <ThemeBox theme={id} colors={colors} />}
        <div>
          <h1 className="font-bold">{title}</h1>
          <h2>{desc}</h2>
        </div>
      </div>
      {!purchased &&
        <Button
          variant="outline"
          onClick={() => purchaseItem(id)}
        >
          <p>{price}</p>
          <BadgeCent />
        </Button>}
      {purchased &&
        <Button
          variant="disabled"
        >
          <p>Purchased</p>
        </Button>
      }
    </div>
  )
}