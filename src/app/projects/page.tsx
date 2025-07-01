import { ProjectEntryProps } from "../components/ui/project-entry"
import ProjectEntry from "../components/ui/project-entry"
import ProjectFooter from "../components/ui/project-footer"

let projectList: ProjectEntryProps[] = [
  {
    "imgSrc": "/logo-zm.webp",
    "href":"https://github.com/icssc/zotmeal",
    "title":"ZotMeal",
    "shortDesc":"View up-to-date dining hall dish and event information.[N]Built by students, for students.",
    "date":"Dec. 2024 - Now",
  },
  {
    "imgSrc":"/logo-zm.webp",
    "href":"https://github.com/eightbitbyte/exsanguination",
    "title":"Exsanguination",
    "shortDesc":"Survive waves of infected while inoculating against the deadly virus.[N]Created for Ludum Dare 56.",
    "date":"Oct. 2024",
  },
  {
    "imgSrc":"/logo-zm.webp",
    "href":"https://github.com/ambientserentiy/project-seafarer",
    "title":"Project Seafarer",
    "shortDesc":"Sail the sea in search of treasure, friendship and adventure.[N]Developed in 48 hours for DiamondHacks at UCSD, 2024",
    "date":"April. 2024",
  },
  {
    "imgSrc":"/logo-zm.webp",
    "href":"https://github.com/bjsilva01/studyzot",
    "title":"StudyZot",
    "shortDesc":"Find a study spot on UCI campus near you.[N]Built over the course of a week for ICSSC's 2023 Webjam.",
    "date":"Nov. 2023",
  },
]

export default function Projects() {
  return (
    <main className="grid grid-rows-1 w-full place-items-center mb-12">
      {projectList.map((project, idx) => 
        <ProjectEntry
          key={project.href}
          {...project}
          gap={idx < projectList.length - 1}
        />
      )}
      {/* TODO: Add responsive amount or better yet, just change to row format? 
                Where icons appear above and below the footer text?*/}
      <ProjectFooter amount={6}/>
    </main>
  )
}