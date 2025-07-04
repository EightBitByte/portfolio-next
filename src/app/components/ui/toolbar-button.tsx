import Link from "next/link";
import type { JSX } from "react";
import { toLink } from "@/app/utils/utils";

export interface ToolbarButtonProps {
  /* The title and link to the page */
  title: string;
}

export default function ToolbarButton({
  title,
}: ToolbarButtonProps): JSX.Element {
  return (
    <Link
      href={toLink(title)}
      className="underline-anim text-xl md:text-2xl font-bold tracking-normal"
    >
      {title}
    </Link>
  );
}
