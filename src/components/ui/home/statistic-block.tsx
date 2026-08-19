"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/utils";

interface StatisticBlockProps {
  title: string,
  subtitle: string,
  imgSrc: string,
  type: "song" | "game",
};

export default function StatisticBlock({
  title,
  subtitle,
  imgSrc,
  type,
} : StatisticBlockProps) {
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2 items-center w-fit">

      <div className="relative shrink-0 rounded-md overflow-hidden w-20 h-20">
        {imgLoading && (
          <div className="absolute inset-0 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse z-10" />
        )}
        <Image
          src={imgSrc}
          fill
          alt={type === "song" ? `Cover art for ${subtitle}` : `Game art for ${subtitle}`}
          unoptimized
          onLoad={() => setImgLoading(false)}
          className={cn(
            "w-full h-full rounded-lg object-cover transition-opacity duration-300",
            imgLoading ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
      <div className="flex flex-col gap-0 items-center">
        <h1 className="text-lg font-bold">
          {title}
        </h1>
        <h2>{subtitle}</h2>
      </div>

    </div>
  )
}
