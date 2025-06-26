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
    <div className={`grid grid-cols-[9fr_100fr] px-4 max-w-full
                     md:px-0 md:w-7/10 grid-rows-1 ${className}`}>
      <p className="pr-1 md:pr-3.5 border-r text-vertical font-bold text-xl md:text-2xl">
        {title}
      </p>
      <div className={`flex flex-col gap-${gap} pl-5.5`}>
        {children}
      </div>
    </div>
  )
}