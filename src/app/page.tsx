'use client';

import { useTheme } from "next-themes";
import FooterButton from "../components/ui/footer-button";
import HomeSection from "../components/ui/home-section";
import ProjectButton from "../components/ui/project-button";
import { StatLink } from "@/components/ui/stat-link";
import { cn } from "@/utils/utils";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col flex-grow w-full items-center">
      <div className="w-full grid grid-rows-1 place-items-center gap-24">
        <HomeSection title="Me" gap={5}>
          <h1 className="text-3xl md:text-[2.35rem] font-bold">
            Hi, I'm Jacob Moy.
          </h1>
          <div className={cn(
            "flex flex-col gap-5 text-lg md:text-xl tracking-wideish leading-[22px] md:leading-7",
            theme != "light" && theme != "latte" && "text-foreground/60",
          )}>
            <p>
              My journey with computers began at the age of five when I playfully
              removing keycaps from an old laptop.
            </p>
            <p>
              This early curiosity quickly evolved into a passion for creating
              video games, designing and developing websites, and exploring
              cutting-edge technologies.
            </p>
            <p>
              Presently, I am pursuing a degree in computer science at the
              University of California, Irvine, with a focus on systems and
              software. I anticipate graduating in June 2026.
            </p>
          </div>
        </HomeSection>
        <HomeSection title="Projects" gap={6}>
          <ProjectButton
            imgSrc="/logo-zm.webp"
            href="https://github.com/icssc/ZotMeal"
            title="ZotMeal"
            shortDesc="Discover dining options and plan meals at UC Irvine."
            tags="Tool,Web,UCI"
          />
          <ProjectButton
            imgSrc="/logo-zm.webp"
            href="https://github.com/EightBitByte/leetcode-watcher"
            title="LeetCode Watcher"
            shortDesc="Monitor friends' progress and get live updates without leaving Discord."
            tags="Bot,Discord"
          />
          <ProjectButton
            imgSrc="/exsanguination.webp"
            href="https://github.com/EightBitByte/exsanguination"
            title="Exsanguination"
            shortDesc="Defend against the encroaching virus and infected hordes."
            tags="Game,WIP"
          />
        </HomeSection>
        <HomeSection title="Contact" gap={4}>
          <div className={cn(
            "text-lg md:text-xl tracking-wideish leading-[22px] md:leading-7 flex flex-col gap-5",
            theme != "latte" && theme != "light" && "text-foreground/60"
            )}>
            <p>
              <StatLink
                href="mailto:jacob.anthony.moy@gmail.com"
                rel="noreferrer"
                className="text-link"
              >
                Send me an email
              </StatLink>
              , I'd be happy to talk with you about how I can contribute to your
              next big thing.
            </p>
            <p>
              Check out more of{" "}
              <StatLink
                href="https://github.com/EightBitByte"
                rel="noreferrer"
                className="text-link"
              >
                my work on GitHub
              </StatLink>{" "}
              and{" "}
              <StatLink
                href="https://linkedin.com/in/moy-jacob"
                rel="noreferrer"
                className="text-link"
              >
                sneak a peek at my LinkedIn.
              </StatLink>
            </p>
            <p>
              If you're interested in getting to know more about me,{" "}
              <StatLink
                href="https://blog.jacobmoy.com"
                rel="noreferrer"
                className="text-link"
              >
                peep my blog.
              </StatLink>
            </p>
          </div>
        </HomeSection>
      </div>

      <div className="mt-auto pt-12 pb-6 flex flex-row gap-5 items-center">
        <FooterButton
          href="https://github.com/EightBitByte"
          type="GITHUB"
        />
        <FooterButton
          href="https://linkedin.com/in/moy-jacob"
          type="LINKEDIN"
        />
        <FooterButton
          href="mailto:jacob.anthony.moy@gmail.com"
          type="MAIL"
        />
        <FooterButton 
          href="https://blog.jacobmoy.com" 
          type="BLOG"
        />
        <FooterButton
          href="https://jacobmoy.com/quick-links"
          type="LINK"
        />
      </div>
    </div>
  );
}