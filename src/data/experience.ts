export interface Experience {
  /* An image representing the company (logo, etc.) */
  href: string;
  /* The name of the company */
  company: string;
  /* The title of the position at the company */
  title: string;
  /* The time from which the position was held */
  period: string;
}

export const EXPERIENCES: Experience[] = [
  {
    href: "/logo-jm.webp",
    company: "Forge Creative Studio",
    title: "Freelance IT Consultant",
    period: "June 2026 -",
  },
  {
    href: "/logo-jm.webp",
    company: "Dr. Moy DPM",
    title: "Web Developer & Multimedia Coordinator",
    period: "August 2025 -",
  },
  {
    href: "/logo-pp.webp",
    company: "PeterPlate",
    title: "Project Lead & Web Developer",
    period: "December 2024 - June 2026",
  },
];
