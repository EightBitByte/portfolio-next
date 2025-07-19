import { toTitleCase } from "@/utils/utils";
import { Check } from "lucide-react";

interface FilterButtonProps {
  title: string,
  numPosts: number,
  isActive: boolean,
  onToggle: () => void,
}

export default function FilterButton({title, numPosts, isActive, onToggle} : FilterButtonProps) {
  return (
    <button 
      onClick={onToggle}
      type="button" 
      className="text-start hover:cursor-pointer w-full grid grid-cols-2"
    >
      <p>
        {toTitleCase(title
          .substring(title.indexOf('/') + 1)
          .replaceAll('-', ' '))
        }
        &nbsp;
        ({numPosts})
      </p>
      {isActive && <Check/>}
    </button>
  )
}