import type { ProjectEntryProps } from "../../components/ui/project-entry";
import ProjectEntry from "../../components/ui/project-entry";
import ProjectFooter from "../../components/ui/project-footer";

const projectList: ProjectEntryProps[] = [
  {
    imgSrc: "/logo-zm.webp",
    href: "https://peterplate.com",
    repo: "https://github.com/icssc/PeterPlate",
    title: "PeterPlate",
    shortDesc:
      "View up-to-date dining hall dish and event information.[N]Built by students, for students.",
    date: "Dec. 2024 - Now",
  },
  {
    imgSrc: "/lc-banner.webp",
    href: "https://github.com/EightBitByte/leetcode-watcher",
    title: "Leetcode Watcher",
    shortDesc:
      "Monitor friends' LeetCode progress and get live updates all without leaving Discord.",
    date: "Mar. 2025"
  },
  {
    href: "https://github.com/EightBitByte/buckshot-roulette-sim",
    title: "Buckshot Roulette Sim",
    shortDesc: "Running experiments on different viable strategems for the game Buckshot Roulette.",
    date: "Dec. 2024",
  },
  {
    imgSrc: "/exsanguination-banner.webp",
    href: "https://github.com/eightbitbyte/exsanguination",
    title: "Exsanguination",
    shortDesc:
      "Survive waves of infected while inoculating against the deadly virus.[N]Created for Ludum Dare 56.",
    date: "Oct. 2024",
  },
  {
    imgSrc: "/seafarer-banner.webp",
    href: "https://github.com/ambientserenity/project-seafarer",
    title: "Project Seafarer",
    shortDesc:
      "Sail the sea in search of treasure, friendship and adventure.[N]Developed for UCSD's 2024 DiamondHacks.",
    date: "Apr. 2024",
  },
  {
    imgSrc: "/studyzot-banner.webp",
    href: "https://github.com/bjsilva01/studyzot",
    title: "StudyZot",
    shortDesc:
      "Find a study spot on UCI campus near you.[N]Built over the course of a week for ICSSC's 2023 Webjam.",
    date: "Nov. 2023",
  },
];

export default function Projects() {
  return (
    <main className="grid grid-rows-1 w-full place-items-center mb-12 md:px-0 px-4">
      {projectList.map((project, idx) => (
        <ProjectEntry
          key={project.href}
          {...project}
          gap={idx < projectList.length - 1}
        />
      ))}
      <ProjectFooter amount={6} />
    </main>
  );
}
