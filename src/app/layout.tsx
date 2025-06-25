import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import Toolbar from "./components/ui/toolbar";

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
    <html lang="en">
      <body
        className={`${karlaSans.variable} antialiased`}
      >
        <Toolbar/>
        {children}
      </body>
    </html>
  );
}
