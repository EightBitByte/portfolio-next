"use client";
import { useState } from "react";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { Experience } from "@/data/experience";
import { AspectRatio } from "./aspect-ratio";


export default function ExperienceItem({
  href,
  company,
  title,
  period
} : Experience) {
  const [imgLoading, setImgLoading] = useState<boolean>(true);


  return (
    <div className="flex flex-row items-start gap-8">
      <div
        className="w-8 h-8 min-w-8 min-h-8 relative 
                   md:w-12 md:h-12 md:min-w-12 md:min-h-12"
      >
        {imgLoading && (
          <div className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
        )}
        <Image
          src={href}
          alt={`An icon for Jacob Moy's project, ${title}.`}
          fill
          unoptimized
          onLoad={() => setImgLoading(false)}
          className={cn(
            "rounded-full transition-opacity duration-300",
            imgLoading ? "opacity-0" : "opacity-100",
          )}
        />
      </div>
      <div className="grid grid-cols-[3fr_2fr] grid-rows-2 w-full">
          <h1 className="font-bold">{company}</h1>
          <h2 className="font-bold text-right">{period}</h2>
          <h2>{title}</h2>
      </div>
    </div>
  )
}