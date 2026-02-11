import Image from "next/image";
import { formatDate } from "@/utils/utils";
import { AspectRatio } from "./aspect-ratio";

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
  return (
    <a className="md:w-sm h-100 flex flex-col gap-2" href={`blog/posts/${slug}`}>
      <AspectRatio ratio={5 / 3}>
        <Image
          src={prevImgSrc}
          fill
          alt={alt}
          priority
          className="w-full h-full rounded-lg object-cover"
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
