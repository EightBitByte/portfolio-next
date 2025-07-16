import Image from "next/image";

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
          className="rounded-full dark:grayscale dark:brightness-75"
        />
      </div>
      <div>
        <h1 className="md:text-xl dark:text-zinc-400">
          <span className="font-bold text-[var(--foreground)]">{title}</span> -{" "}
          {shortDesc}
        </h1>
        <div className="flex flex-row gap-2">
          {tags.split(",").map((tag) => (
            <p
              key={tag}
              className="rounded-full border-1 border-[var(--divider)]
                         px-2 h-5 text-sm text-center dark:text-zinc-400"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
    </a>
  );
}
