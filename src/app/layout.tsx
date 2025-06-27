import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import Toolbar from "./components/ui/toolbar";
import { ThemeProvider } from "./components/theme-provider";
import ThemeToggle from "./components/ui/theme-toggle";

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
      <body
        className={`${karlaSans.variable} antialiased`}
      >
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toolbar/>
          <ThemeToggle/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
