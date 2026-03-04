export interface Project {
  /* URL to image for project icon if on homepage */
  iconImgSrc?: string;
  /* URL to an image for the project */
  imgSrc?: string;
  /* URL to the project */
  href: string;
  /* URL to the project's repository */
  repo?: string;
  /* The project's title */
  title: string;
  /* A short description of the project */
  shortDesc: string;
  /* The date of work on the project */
  date: string;
  /* Tags for organization */
  tags: string[];
  /* Whether or not to showcase on the homepage */
  homepage?: boolean;
}

export const PROJECTS: Project[] = [
  {
    iconImgSrc: "/logo-pp.webp",
    imgSrc: "/peterplate-banner.webp",
    href: "https://peterplate.com",
    repo: "https://github.com/icssc/PeterPlate",
    title: "PeterPlate",
    shortDesc: "Discover dining options and plan meals at UC Irvine.",
    date: "December 2024 - Now",
    tags: ["Tool", "Web", "UCI"],
    homepage: true,
  },
  {
    iconImgSrc: "/logo-dl.webp",
    imgSrc: "/dl-banner.webp",
    href: "https://deadlock.jacobmoy.com",
    repo: "https://github.com/EightBitByte/deadlock-tier-list",
    title: "Deadlock Tier List",
    shortDesc:
      "Vote on the viability of your favorite characters from Deadlock.",
    date: "January 2026",
    tags: ["Game", "Tool"],
    homepage: true,
  },
  {
    iconImgSrc: "/logo-lc.webp",
    imgSrc: "/lc-banner.webp",
    href: "https://github.com/EightBitByte/leetcode-watcher",
    title: "Leetcode Watcher",
    shortDesc:
      "Monitor friends' LeetCode progress and get live updates all without leaving Discord.",
    date: "Mar. 2025",
    tags: ["Tool", "Bot"],
    homepage: true,
  },
  {
    href: "https://github.com/EightBitByte/buckshot-roulette-sim",
    title: "Buckshot Roulette Sim",
    shortDesc:
      "Running experiments on different viable strategems for the game Buckshot Roulette.",
    date: "Dec. 2024",
    tags: ["Game", "Tool", "Experiment", "WIP"],
  },
  {
    iconImgSrc: "/exsanguination.webp",
    imgSrc: "/exsanguination-banner.webp",
    href: "https://github.com/EightBitByte/exsanguination",
    title: "Exsanguination",
    shortDesc: "Defend against the encroaching virus and infected hordes.",
    date: "Oct. 2024",
    tags: ["Game", "WIP"],
  },
  {
    imgSrc: "/seafarer-banner.webp",
    href: "https://github.com/ambientserenity/project-seafarer",
    title: "Project Seafarer",
    shortDesc:
      "Sail the sea in search of treasure, friendship and adventure.[N]Developed for UCSD's 2024 DiamondHacks.",
    date: "Apr. 2024",
    tags: ["Game", "Hackathon"],
  },
  {
    imgSrc: "/studyzot-banner.webp",
    href: "https://github.com/bjsilva01/studyzot",
    title: "StudyZot",
    shortDesc:
      "Find a study spot on UCI campus near you.[N]Built over the course of a week for ICSSC's 2023 Webjam.",
    date: "Nov. 2023",
    tags: ["Game", "Hackathon"],
  },
];
