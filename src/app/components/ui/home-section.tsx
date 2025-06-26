export interface HomeSectionProps {
  /* The left-hand vertical title of the section*/
  title: string,
  /* The children/content of the section */
  children: React.ReactNode,
  /* The gap for the content of the section */
  gap: number,
  /* Extra classes to add to the parent div */
  className?: string
}

export default function HomeSection({
  title,
  children,
  gap,
  className
} : HomeSectionProps) {
  return (
    <div className={`grid grid-cols-[90px_1000px] grid-rows-1 ${className}`}>
      <p className="pr-3 border-r text-vertical font-bold text-2xl">{title}</p>
      <div className={`flex flex-col gap-${gap} pl-5`}>
        {children}
      </div>
    </div>
  )
}