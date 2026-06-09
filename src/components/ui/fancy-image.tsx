"use client";
import { useState } from "react";
import { AspectRatio } from "./aspect-ratio";
import { type ImageProps } from "next/image";
import Image from "next/image";
import { cn } from "@/utils/utils";


export function FancyImage({props} : {props: ImageProps}) {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <AspectRatio ratio={16 / 9} className="mb-4">
      {imgLoading && (
        <div className="absolute inset-0 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse z-10" />
      )}
      <Image
        className={cn("w-full rounded-lg object-cover transition-opacity duration-300",
          imgLoading ? "opacity-0" : "opacity-100"
        )}
        fill
        onLoad={() => setImgLoading(false)}
        unoptimized
        {...(props as ImageProps)}
      />
    </AspectRatio>
  );
}