import Link from "next/link";
import type { JSX } from "react";
import { toLink } from "@/utils/utils";
import { StatLink } from "./stat-link";

export interface ToolbarButtonProps {
  /* The title and link to the page */
  title: string;
}

export default function ToolbarButton({
  title,
}: ToolbarButtonProps): JSX.Element {
  return (
    <StatLink
      href={toLink(title)}
      className="underline-anim text-lg md:text-2xl font-bold tracking-normal"
    >
      {title}
    </StatLink>
  );
}
