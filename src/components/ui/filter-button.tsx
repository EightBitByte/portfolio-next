import { Check } from "lucide-react";
import { cn } from "@/utils/utils";
import { toTitleCase } from "@/utils/utils";

interface FilterButtonProps {
  title: string;
  numPosts: number;
  isActive: boolean;
  onToggle: () => void;
}

export default function FilterButton({
  title,
  numPosts,
  isActive,
  onToggle,
}: FilterButtonProps) {
  return (
    <button
      onClick={onToggle}
      type="button"
      className={cn(
        "text-start hover:cursor-pointer w-full grid grid-cols-2",
        numPosts === 0 && "dark:text-zinc-500 text-zinc-400",
      )}
    >
      <p>
        {toTitleCase(
          title.substring(title.indexOf("/") + 1).replaceAll("-", " "),
        )}
        &nbsp; ({numPosts})
      </p>
      {isActive && <Check />}
    </button>
  );
}
