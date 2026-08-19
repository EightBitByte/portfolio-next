export interface HomeSectionProps {
  /* The title of the section*/
  title?: string;
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
      className={`px-4
                  md:px-0 md:w-4xl w-full ${className == undefined ? "" : className}`}
    >
      {title && 
        <h1 className="text-2xl font-bold mb-4">
          {title}
        </h1>
      }
      <div 
        className="flex flex-col w-full"
        style={{
          gap: `${0.25 * gap}rem`
        }}
      >{children}</div>
    </div>
  );
}
