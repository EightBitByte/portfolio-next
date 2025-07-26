"use client";

import { Coffee, Cookie, LucideIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { JSX, useEffect, useState } from "react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { achievements } from "@/utils/achievement-handler";
import { toTitleCase } from "@/utils/utils";

type Theme = {
  id: string,
  displayName?: string,
}

export const THEME_DATA: Theme[] = [
  {
    id: "light",
  },
  {
    id: "dark",
  },
  {
    id: "latte",
    displayName: "Catppuccin Latte"
  },
  {
    id: "mocha",
    displayName: "Catppuccin Mocha"
  },
  {
    id: "habamax",
  },
]

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-4 right-4">
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      </div>
    );
  }

  const themeIcon: () => JSX.Element = () => {
    switch(theme) {
      case "latte":
      case "light":
        return <Sun/>
      case "mocha":
      case "habamax":
      case "dark":
        return <Moon/>
      default:
        return <Sun/>
    }
  }

  return (
    <div className="fixed top-4 right-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {themeIcon()}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {THEME_DATA.map((theme) => 
            <DropdownMenuItem
              key={theme.id}
              onClick={() => {
                setTheme(theme.id);
                achievements.unlockAchievement("SWITCH_IT_UP");
              }}
            >
              {!theme.displayName && toTitleCase(theme.id)}
              {theme.displayName != undefined && theme.displayName}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
