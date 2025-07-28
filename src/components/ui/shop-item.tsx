import { BadgeCent } from "lucide-react";
import { Button } from "./button";
import ThemeBox from "./theme-box";
import { shop, ShopId } from "@/utils/shop-handler";

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
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-row gap-2 items-center">
        {colors != null && <ThemeBox theme={id} colors={colors}/>}
        <div>
          <h1 className="font-bold">{title}</h1>
          <h2>{desc}</h2>
        </div>
      </div>
      {!purchased &&
      <Button 
        variant="outline"
        onClick={() => shop.purchase(id)}
      >
        <p>{price}</p>
        <BadgeCent/>
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