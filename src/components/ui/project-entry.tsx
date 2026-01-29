'use client';

import { Code, Github, GithubIcon, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "./aspect-ratio";
import { StatLink } from "./stat-link";
import { cn } from "@/utils/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./button";

export interface ProjectEntryProps {
  /* URL to an image for the project */
  imgSrc?: string;
  /* URL to the project */
  href: string;
  /* URL to the project's repository */
  repo?: string;
  /* The project's title */
  title: string;
  /* A short description of the project */
  shortDesc: string;
  /* The date of work on the project */
  date: string;
  /* Whether or not to add a gap below the entry */
  gap?: boolean;
}

export default function ProjectEntry({
  imgSrc,
  href,
  repo,
  title,
  shortDesc,
  date,
  gap,
}: ProjectEntryProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted)
    return null;

  return (
    <div
      className="grid w-full grid-rows-1 grid-cols-[3fr_100fr] 
                 md:w-3xl md:grid-cols-[9fr_100fr]"
    >
      <p
        className="pr-1 border-r border-[var(--divider)] 
                   text-vertical font-bold text-lg
                   md:pr-3.5 md:text-xl"
      >
        {date}
      </p>
      <div
        className={cn(
          "md:pl-5.5 pl-3 flex flex-col md:gap-3 gap-2 md:pr-0 min-w-0",
          gap && "md:pb-32 pb-18"
        )}
      >
        <AspectRatio ratio={9 / 4} className={cn(
          "rounded-lg",
          !imgSrc && "bg-foreground/80 flex items-center justify-center"
        )}>
          {imgSrc &&
            <Image
              src={imgSrc}
              alt={`An image of Jacob Moy's project, ${title}.`}
              fill
              className="h-full w-full rounded-lg object-cover"
            />}
          {!imgSrc &&
            <Image
              src="/placeholder.webp"
              alt={`A placeholder image for project ${title} without assets.`}
              width={90}
              height={90}
              className={cn(
                (theme == "light" || theme == "latte") && "invert"
              )}
            />}
        </AspectRatio>
        <div className="inline-flex flex-row gap-2 items-center">
          <h1 className="md:text-4xl text-3xl text-foreground
                        font-bold w-fit">
            {title}
          </h1>
          <StatLink href={href}>
            <Button variant={"outline"} size="icon">
              <SquareArrowOutUpRight />
            </Button>
          </StatLink>
          {repo &&
            <StatLink href={repo}>
              <Button variant={"outline"} size="icon">
                <Code />
              </Button>
            </StatLink>
          }
        </div>

        {/* <StatLink href={href}>
          <div className="inline-flex flex-row gap-2 items-center">
            <h1 className="md:text-4xl text-3xl text-foreground
                          font-bold underline w-fit">
              {title}
            </h1>
            <SquareArrowOutUpRight className="md:h-8 md:w-8 h-4 w-4" />
          </div>
        </StatLink> */}
        <div className="md:text-xl text-md text-foreground/70">
          {shortDesc.split("[N]").map((string) => (
            <p key={string}>{string}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
