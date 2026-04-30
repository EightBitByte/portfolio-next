"use client";

import Image from "next/image";
import { formatDate } from "@/utils/utils";
import { AspectRatio } from "./aspect-ratio";
import { useState } from "react";
import { cn } from "@/utils/utils";

export interface BlogEntryProps {
  title: string;
  slug: string;
  prevImgSrc: string;
  alt: string;
  shortDesc: string;
  createdAt: Date;
}

export default function BlogEntry({
  title,
  slug,
  prevImgSrc,
  alt,
  shortDesc,
  createdAt,
}: BlogEntryProps) {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <a 
      className="md:w-sm md:border-0 md:pb-0
      w-full flex flex-col gap-2 border-b-2 pb-8" 
      href={`blog/posts/${slug}`}
    >
      <AspectRatio ratio={5 / 3}>
        {imgLoading && (
          <div className="absolute inset-0 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse z-10" />
        )}
        <Image
          src={prevImgSrc}
          fill
          alt={alt}
          unoptimized
          onLoad={() => setImgLoading(false)}
          className={cn(
            "w-full h-full rounded-lg object-cover transition-opacity duration-300",
            imgLoading ? "opacity-0" : "opacity-100"
          )}
        />
      </AspectRatio>
      <div className="grid grid-cols-1 gap-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2 className="text-lg">{formatDate(createdAt)}</h2>
        <p className="text-lg leading-snug">{shortDesc}</p>
      </div>
    </a>
  );
}
