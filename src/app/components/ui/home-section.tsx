export interface HomeSectionProps {
  /* The left-hand vertical title of the section*/
  title: string,
  /* The children/content of the section */
  children: React.ReactNode,
}

export default function HomeSection({
  title,
  children
} : HomeSectionProps) {
  return (
    <div className="grid grid-cols-[90px_1000px] grid-rows-1 ">
      <p className="pr-3 border-r text-vertical font-bold text-2xl">{title}</p>
      <div className="flex flex-col gap-5 pl-5">
        {children}
      </div>
    </div>
  )
}