import Image from "next/image";
import ToolbarButton from "./toolbar-button";
import { StatLink } from "./stat-link";
import MobileSettings from "./mobile-settings";

export default function Toolbar() {
  return (
    <div 
      className="w-full py-4 mb-12 flex flex-row justify-center items-center gap-4
                 md:gap-6">
      <StatLink href="/">
        <Image
          src="/logo-jm.webp"
          alt="An image of the capital letters 'JM', signifying Jacob Moy."
          width={32}
          height={32}
          priority
        />
      </StatLink>
      <ToolbarButton title="Projects" />
      <ToolbarButton title="Blog" />
      <ToolbarButton title="Quick Links" />
      <div className="block md:hidden">
        <MobileSettings/>
      </div>
    </div>
  );
}
