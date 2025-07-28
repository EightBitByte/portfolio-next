'use client';

import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/utils/utils";

export interface ProjectButtonProps {
  /* URL for the icon image */
  imgSrc: string;
  /* URL for the project page */
  href: string;
  /* The title of the project*/
  title: string;
  /* A short (<80 char) description of the project */
  shortDesc: string;
  /* Comma delineated tags */
  tags: string;
}

export default function ProjectButton({
  imgSrc,
  href,
  title,
  shortDesc,
  tags,
}: ProjectButtonProps) {
  const { theme } = useTheme();

  return (
    <a
      href={href}
      className="flex flex-row gap-4
                 hover:translate-x-5 ease-in-out 
                 transition-transform duration-300"
    >
      <div
        className="w-8 h-8 min-w-8 min-h-8 relative 
                   md:w-12 md:h-12 md:min-w-12 md:min-h-12"
      >
        <Image
          src={imgSrc}
          alt={`An icon for Jacob Moy's project, ${title}.`}
          fill
          className={cn(
            "rounded-full",
            theme != "light" && theme != "latte" && "brightness-65"
          )}
        />
      </div>
      <div>
        <h1 className={cn(
          "md:text-xl",
          theme != "light" && theme != "latte" && "text-foreground/60"
          )}>
          <span className="font-bold text-[var(--foreground)]">{title}</span> -{" "}
          {shortDesc}
        </h1>
        <div className="flex flex-row gap-2">
          {tags.split(",").map((tag) => (
            <p
              key={tag}
              className="rounded-full border-1 border-[var(--divider)]
                         px-2 h-5 text-sm text-center"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
    </a>
  );
}
