import Image from "next/image"
import { AspectRatio } from "./aspect-ratio"
import { SquareArrowOutUpRight } from "lucide-react"

export interface ProjectEntryProps {
    /* URL to an image for the project */
    imgSrc: string,
    /* URL to the project */
    href: string,
    /* The project's title */
    title: string,
    /* A short description of the project */
    shortDesc: string,
    /* The date of work on the project */
    date: string
}

export default function ProjectEntry({
    imgSrc,
    href,
    title,
    shortDesc,
    date
} : ProjectEntryProps) {
  return (
    <div className="grid grid-rows-1 grid-cols-[9fr_100fr] w-3xl px-4">
      <p className="pr-1 md:pr-3.5 border-r border-[var(--divider)] text-vertical font-bold text-xl">
        {date}
      </p>
      <div className="pl-5.5 md:pb-36 flex flex-col gap-3">
        <AspectRatio ratio={9/4} className="bg-muted rounded-lg">
          <Image
            src={imgSrc} 
            alt={`An image of Jacob Moy's project, ${title}.`}
            fill
            className="h-full w-full rounded-lg object-cover"
          />
        </AspectRatio>
        <a href={href} rel="noreferrer">
          <h1 
          className="text-4xl font-bold text-zinc-500 dark:text-zinc-50 underline
                     flex flex-row gap-2 items-center"
          >
            {title} <SquareArrowOutUpRight/>
          </h1>
        </a>
        <div className="text-xl dark:text-zinc-400">
          {shortDesc.split('[N]').map((string) =>
            <p key={string}>{string}</p>
          )}
        </div>
      </div>
    </div>
  )
}