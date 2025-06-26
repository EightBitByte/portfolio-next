import { toTitleCase } from "@/app/utils/utils";
import Image from "next/image";

export interface ProjectButtonProps {
    /* URL for the icon image */
    imgSrc: string,
    /* URL for the project page */
    href: string,
    /* The title of the project*/
    title: string,
    /* A short (<80 char) description of the project */
    shortDesc: string,
    /* Comma delineated tags */
    tags: string
}

export default function ProjectButton({
  imgSrc,
  href,
  title,
  shortDesc,
  tags
} : ProjectButtonProps) {
  return (
    <a 
      href={href} 
      className="flex flex-row gap-4 
                 hover:translate-x-5 ease-in-out 
                 transition-transform duration-300">
      <Image
        src={imgSrc}
        alt={`An icon for Jacob Moy's project, ${title}.`}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div>
        <h1 className="text-xl">
          <span className="font-bold">{title}</span> - {shortDesc}
        </h1>
        <div className="flex flex-row gap-2">
          {tags.split(',').map(tag => 
            <p key={tag} className="rounded-full border-1 
                                    px-2 h-5 text-sm text-center">
              {tag}
            </p>)
          }
        </div>
      </div>
    </a>
  )
}