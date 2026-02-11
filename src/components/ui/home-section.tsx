export interface HomeSectionProps {
  /* The left-hand vertical title of the section*/
  title: string;
  /* The children/content of the section */
  children: React.ReactNode;
  /* The gap for the content of the section */
  gap: number;
  /* Extra classes to add to the parent div */
  className?: string;
}

export default function HomeSection({
  title,
  children,
  gap,
  className,
}: HomeSectionProps) {
  return (
    <div
      className={`grid grid-cols-[9fr_100fr] grid-rows-1 px-4 min-w-full max-w-full 
                  md:px-0 lg:w-1/2 ${className}`}
    >
      <p
        className="pr-1 border-r border-[var(--divider)] 
                    text-vertical font-bold text-xl 
                    md:pr-3.5 md:text-2xl"
      >
        {title}
      </p>
      <div 
        className={`flex flex-col pl-5.5`}
        style={{
          gap: `${0.25 * gap}rem`
        }}
      >{children}</div>
    </div>
  );
}
