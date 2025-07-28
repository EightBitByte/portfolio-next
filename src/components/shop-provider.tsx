'use client';

import { shop } from "@/utils/shop-handler";
import { useEffect } from "react";


export default function ShopProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    shop.init();
  }, []);

  return <>{children}</>;
}