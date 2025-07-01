"use client";

import { Gem, Pickaxe, Bone, Skull, Bomb, ArrowUp } from "lucide-react";
import { useState, useEffect, ReactElement } from "react";
import { chooseIcon } from "@/app/utils/utils";
import Link from "next/link";

const iconComponents = [Gem, Bomb, Pickaxe, Skull, Bone];

const iconSet = iconComponents.map((Icon, i) => (
  <Icon key={i} className="w-8 h-8 text-zinc-400 dark:text-zinc-600" />
));

let iconWeights = [
  3,
  6,
  10,
  20,
  60,
]

export interface ProjectFooterProps {
  /* Number of icons to render in the footer */
  amount?: number,
}

export default function ProjectFooter({
  amount = 6
} : ProjectFooterProps) {
  const [leftIcons, setLeftIcons] = useState<ReactElement[]>([]);
  const [rightIcons, setRightIcons] = useState<ReactElement[]>([]);

  useEffect(() => {
    const generateRandomStyledIcons = (count: number) => {
      return Array.from({ length: count }, (_, i) => {
        const padding = Math.floor(Math.random() * 6 + 1);

        return (
          <div
            key={i}
            style={{
              paddingTop: `${i % 2 === 0 ? padding : 0}rem`,
              paddingBottom: `${i % 2 === 1 ? padding : 0}rem`,
            }}
          >
            {chooseIcon(iconSet, iconWeights)}
          </div>
        );
      });
    };

    setLeftIcons(generateRandomStyledIcons(amount));
    setRightIcons(generateRandomStyledIcons(amount));
  }, [amount]);

  return (
    <div className="grid grid-cols-[2fr_3fr_2fr] grid-rows-1 w-full h-36 mt-24 px-10">
      <div className="flex justify-between items-center">
        {leftIcons}
      </div>
      <div className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 text-2xl">
        <h2>Nothing but us old bones here!</h2>
        <Link href="#root" className="flex flex-row gap-2 items-center underline text-xl">
          Back to Top 
          <ArrowUp/>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        {rightIcons}
      </div>
    </div>
  )
}