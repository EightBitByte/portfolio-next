export interface ProjectEntryProps {
    /* URL to an image for the project */
    imgSrc: string,
    /* URL to the project */
    href: string,
    /* The project's title */
    title: string,
    /* A short description of the project */
    shortDesc: string,
    /* The date of work on the project */
    date: string
}

export default function ProjectEntry({
    imgSrc,
    href,
    title,
    shortDesc,
    date
} : ProjectEntryProps) {
    return (
        <></>
    )
}