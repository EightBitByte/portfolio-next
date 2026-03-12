import type { ProjectEntryProps } from "../../components/ui/project-entry";
import ProjectEntry from "../../components/ui/project-entry";
import ProjectFooter from "../../components/ui/project-footer";
import { PROJECTS } from "@/data/projects";


export default function Projects() {
  return (
    <main 
      className="grid grid-rows-1 w-full place-items-center mb-12 md:px-0 px-4"
    >
      {PROJECTS.map((project, idx) => (
        <ProjectEntry
          key={project.href}
          {...project}
          gap={idx < PROJECTS.length - 1}
        />
      ))}
      <ProjectFooter amount={6} />
    </main>
  );
}
