import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import ThemeToggle, { THEME_DATA } from "../components/ui/theme-toggle";
import Toolbar from "../components/ui/toolbar";
import AchievementButton from "@/components/ui/achievement-button";
import AchievementsProvider from "@/components/achievements-provider";
import { posts } from "@/utils/posts";
import { ToasterProvider } from "@/components/toaster-provider";

const karlaSans = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jacob Moy | Homepage",
  description: "Jacob Moy's portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${karlaSans.variable} antialiased`} id="root">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          // NOTE: This is rather brittle, but next-themes won't play nice with THEME_DATA.
          themes={["light", "dark", "latte", "mocha", "habamax"]}
          enableSystem
          disableTransitionOnChange
        >
          <AchievementsProvider numPosts={posts.getNumPosts()}>
            <Toolbar />
            <ThemeToggle />
            <AchievementButton/>
            {children}
            <ToasterProvider/>
          </AchievementsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
