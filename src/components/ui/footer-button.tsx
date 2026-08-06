import { type LucideIcon } from "lucide-react";
import { StatLink } from "./stat-link";


export default function FooterButton({ href, Icon }: 
{
  href: string,
  Icon: LucideIcon,
}) {
  return (
    <StatLink
      href={href}
      className="hover:-translate-y-2 ease-in-out
                 transition-transform"
    >
      <Icon
        size={24}
        className="stroke-primary opacity-50 hover:opacity-100 transition-opacity ease-in-out"
      />
    </StatLink>
  );
}
