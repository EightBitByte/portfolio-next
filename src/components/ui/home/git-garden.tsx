import { cn } from "@/utils/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

const EXAMPLE_MONTHLY_DATA = {
  totalContributions: 18,
  additions: 27312,
  deletions: 76422,
  days: {
    1: 2,
    2: 2,
    3: 2,
    8: 4,
    9: 6,
    10: 2,
    21: 2,
    22: 3,
    23: 4,
    24: 10,
  }
}

type HueVariant = "none" | "xs" | "sm" | "md" | "lg" | "xl";

const getDaysInMonth = (): number => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

const getHue = (count: number, totalContributions: number): HueVariant  => {
  const rank = count / totalContributions;

  if (rank >= .65)
    return "xl";
  else if (rank >= .40)
    return "lg"
  else if (rank >= .25)
    return "md";
  else if (rank >= .15)
    return "sm"
  else if (rank != 0)
    return "xs";

  return "none";
}

export default function GitGarden() {
  const daysInMonth = getDaysInMonth();
  const dayContributionMap = new Map(
    Object.entries(EXAMPLE_MONTHLY_DATA.days)
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="grid grid-cols-7 gap-2">
          {Array.from({length: daysInMonth}).map((_, i) => {
            const contributions = dayContributionMap.get(`${i+1}`) ?? 0;
            const variant = getHue(contributions, EXAMPLE_MONTHLY_DATA.totalContributions);
            
            return (
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <div 
                    key={i} 
                    className={cn("w-4 h-4 bg-foreground/10 rounded-xs",
                      variant === "xs" && "dark:bg-green-400/20 bg-green-600/20",
                      variant === "sm" && "dark:bg-green-400/40 bg-green-600/40",
                      variant === "md" && "dark:bg-green-400/60 bg-green-600/60",
                      variant === "lg" && "dark:bg-green-400/85 bg-green-600/85",
                      variant === "xl" && "dark:bg-green-400 bg-green-600 "
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent >
                  {contributions} commits
                </TooltipContent>
            </Tooltip>
            )
          })}
        </div>

        <div className="font-mono text-lg text-foreground/80">
          <h2>+{EXAMPLE_MONTHLY_DATA.additions}</h2>
          <h2>-{EXAMPLE_MONTHLY_DATA.deletions}</h2>
        </div>
      </div>
    </div>
  )
}
