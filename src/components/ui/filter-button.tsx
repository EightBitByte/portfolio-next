'use client';

import { Check } from "lucide-react";
import { useState } from "react";

interface FilterButtonProps {
  title: string,
  numPosts: number,
}

export default function FilterButton({title, numPosts} : FilterButtonProps) {
  const [filter, setFilter] = useState(false);
  
  function toggleFilter() {
    setFilter(!filter);
  }

  return (
    <button 
      onClick={toggleFilter} 
      type="button" 
      className="text-start hover:cursor-pointer w-full grid grid-cols-2"
    >
      <p>{title} ({numPosts})</p>
      {filter && <Check/>}
    </button>
  )
}