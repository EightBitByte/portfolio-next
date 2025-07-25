"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { achievements } from "@/utils/achievement-handler";
import { toTitleCase } from "@/utils/utils";

export const THEME_DATA = [
  "light",
  "dark",
  "catpuccin-latte",
  "catpuccin-mocha",
  "habamax",
]


export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {THEME_DATA.map((theme) => 
            <DropdownMenuItem
              key={theme}
              onClick={() => {
                setTheme(theme);
                achievements.unlockAchievement("SWITCH_IT_UP");
              }}
            >
              {toTitleCase(theme.replaceAll('-', ' '))}
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
