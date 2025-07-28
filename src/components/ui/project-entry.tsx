import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "./aspect-ratio";
import { StatLink } from "./stat-link";

export interface ProjectEntryProps {
  /* URL to an image for the project */
  imgSrc: string;
  /* URL to the project */
  href: string;
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
  title,
  shortDesc,
  date,
  gap,
}: ProjectEntryProps) {
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
        className={`md:pl-5.5 pl-3 flex flex-col ${gap ? "md:pb-32 pb-18" : ""} md:gap-3 gap-2 md:pr-0 min-w-0`}
      >
        <AspectRatio ratio={9 / 4} className="bg-muted rounded-lg">
          <Image
            src={imgSrc}
            alt={`An image of Jacob Moy's project, ${title}.`}
            fill
            className="h-full w-full rounded-lg object-cover"
          />
        </AspectRatio>
        <StatLink href={href}>
          <h1 className="md:text-4xl text-3xl text-foreground/60
                         font-bold underline flex flex-row gap-2 items-center">
            {title} <SquareArrowOutUpRight className="md:h-8 md:w-8 h-4 w-4" />
          </h1>
        </StatLink>
        <div className="md:text-xl text-md text-foreground">
          {shortDesc.split("[N]").map((string) => (
            <p key={string}>{string}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
