import ProjectEntry from "../components/ui/project-entry"

export default function Projects() {
  return (
    <main className="grid grid-rows-1 w-full place-items-center">
      <ProjectEntry
        imgSrc="/logo-zm.webp"
        href="https://github.com/icssc/zotmeal"
        title="ZotMeal"
        shortDesc="View up-to-date dining hall dish and event information.[N]Built by students, for students."
        date="Dec. 2024 - Now"
      />
      <ProjectEntry
        imgSrc="/logo-zm.webp"
        href="https://github.com/exsanguination"
        title="Exsanguination"
        shortDesc="Survive waves of infected while inoculating against the deadly virus.[N]Created for Ludum Dare 56."
        date="Oct. 2024"
      />
      <ProjectEntry
        imgSrc="/logo-zm.webp"
        href=""
        title="ZotMeal"
        shortDesc="View up-to-date dining hall dish and event information.[N]Built by students, for students."
        date="Dec. 2024 - Now"
      />
    </main>
  )
}