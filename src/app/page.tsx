'use client';

import { useTheme } from "next-themes";
import FooterButton from "../components/ui/footer-button";
import HomeSection from "../components/ui/home-section";
import ProjectButton, {ProjectButtonProps} from "../components/ui/project-button";
import { StatLink } from "@/components/ui/stat-link";
import { cn } from "@/utils/utils";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/data/projects";
import {ArrowUpToLine, Code, LibraryBig} from "lucide-react";
import ExperienceItem from "@/components/ui/experience-item";
import {EXPERIENCES} from "@/data/experience";


export default function Home() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const usingLight: boolean = resolvedTheme == "light" || resolvedTheme == "latte" || resolvedTheme == "deadlock";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // TODO: Create a loading skeleton here instead.
  if (!isMounted)
    return null;

  return (
    <div className="flex flex-col grow w-full items-center">
      <div className="w-full grid grid-rows-1 place-items-center gap-18">
        <HomeSection gap={3}>
          <h1 className="text-3xl md:text-[2.35rem] font-bold w-fit">
            Hi, I'm Jacob Moy.
          </h1>
            <p className="flex flex-col gap-5 text-lg md:text-xl tracking-wideish leading-5.5 md:leading-7 max-w-[70vw]">
              I like making cool stuff on the interwebs; websites, games, software -- you name it, I've done it.
            </p>
        </HomeSection>
        <HomeSection title="Experience" gap={8}>
            {EXPERIENCES.map(props => 
              <ExperienceItem {...props} />
            )}
        </HomeSection>
        {/* <HomeSection title="Projects" gap={6}>
          {PROJECTS.filter(project => project.homepage).map(props => 
            <ProjectButton 
              key={props.title}
              imgSrc={props.iconImgSrc ?? ""}
              href={props.href}
              title={props.title}
              shortDesc={props.shortDesc}
              tags={props.tags}
            />
          )}
        </HomeSection> */}
      </div>

      <div className="mt-auto pt-12 pb-6 flex flex-row gap-5 items-center">
       <FooterButton
          href="#top"
          Icon={ArrowUpToLine}
        />
        <FooterButton
          href="/projects"
          Icon={Code}
        />
        <FooterButton
          href="/blog"
          Icon={LibraryBig}
        />
        <div className="h-8 w-px bg-primary opacity-50"/>
        <p className="text-primary opacity-50">
          jamoyai (c) 2026
        </p>
      </div>
    </div>
  );
}