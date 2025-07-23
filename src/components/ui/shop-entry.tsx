import { BadgeCent } from "lucide-react";
import { Button } from "./button";

interface ShopEntryProps {
  title: string,
  desc: string,
  price: number,
  purchased: boolean,
}

function handleShopPurchase(title: string, price: number) {
  let newTitle: string = title
    .toUpperCase()
    .replaceAll(' ', '-');

  console.log("Purchase of", newTitle, "for", price);
}

export default function ShopEntry({
  title,
  desc,
  price,
  purchased
}: ShopEntryProps) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div>
        <h1 className="font-bold">{title}</h1>
        <h2>{desc}</h2>
      </div>
      {!purchased &&
      <Button 
        variant="outline"
        onClick={() => handleShopPurchase(title, price)}
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