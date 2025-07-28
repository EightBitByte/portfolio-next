import { StatLink } from "@/components/ui/stat-link";
import {
  Book,
  Brain,
  Dices,
  Eye,
  Film,
  Github,
  Instagram,
  Keyboard,
  Linkedin,
  type LucideIcon,
  Mail,
  MessageCircleCode,
  Skull,
  Smile,
  SquareUserRound,
  Users,
  Utensils,
} from "lucide-react";

interface IconWrapperProps {
  IconComponent: LucideIcon;
}

const CategoryIcon = ({ IconComponent }: IconWrapperProps) => {
  return <IconComponent className="w-7 h-7" />;
};

const LinkIcon = ({ IconComponent }: IconWrapperProps) => {
  return <IconComponent className="w-5 h-5" />;
};

const links = [
  {
    title: "Socials",
    icon: Users,
    links: [
      {
        title: "Instagram",
        link: "https://instagram.com/jacob_moyai/",
        icon: Instagram,
      },
      {
        title: "LinkedIn",
        link: "https://linkedin.com/in/moy-jacob",
        icon: Linkedin,
      },
      {
        title: "GitHub",
        link: "https://github.com/EightBitByte",
        icon: Github,
      },
      {
        title: "Email",
        link: "mailto:jamoy@uci.edu",
        icon: Mail,
      },
    ],
  },
  {
    title: "Projects",
    icon: MessageCircleCode,
    links: [
      {
        title: "ZotMeal",
        link: "https://github.com/icssc/zotmeal",
        icon: Utensils,
      },
      {
        title: "Portfolio (Code)",
        link: "https://github.com/EightBitByte/portfolio-next",
        icon: SquareUserRound,
      },
      {
        title: "Exsanguination",
        link: "https://github.com/EightBitByte/exsanguination",
        icon: Skull,
      },
      {
        title: "LeetCode Watcher",
        link: "https://github.com/EightBitByte/leetcode-watcher",
        icon: Eye,
      },
      {
        title: "Buckshot Roulette Sim",
        link: "https://github.com/EightBitByte/buckshot-roulette-sim",
        icon: Dices,
      },
      {
        title: "PhilmPhreaks",
        link: "https://github.com/EightBitByte/philmphreaks",
        icon: Film,
      },
    ],
  },
  {
    title: "Fun",
    icon: Smile,
    links: [
      {
        title: "MonkeyType",
        link: "https://monkeytype.com/profile/EightBitByte",
        icon: Keyboard,
      },
      {
        title: "GoodReads",
        link: "https://www.goodreads.com/user/show/190506359-jacob-moy",
        icon: Book,
      },
      {
        title: "Grugbrain",
        link: "https://grugbrain.dev",
        icon: Brain,
      },
    ],
  },
];

export default function QuickLinks() {
  return (
    <div className="flex flex-row flex-wrap w-3xl mx-auto justify-evenly">
      {links.map((category) => (
        <div key={category.title} className="grid grid-cols-1 gap-2 p-8 h-fit">
          <div className="flex flex-row gap-4 items-center border-b-2 pb-1 pr-8">
            <CategoryIcon IconComponent={category.icon} />
            <h1 className="font-bold text-2xl">{category.title}</h1>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {category.links.map((link) => (
              <StatLink
                key={link.title}
                href={link.link}
                target="_blank"
                className="flex flex-row gap-2 items-center text-lg
                            hover:translate-x-2 ease-in-out transition-transform"
                isFunLink={category.title == "Fun"}
              >
                <LinkIcon IconComponent={link.icon} />
                <h2>{link.title}</h2>
              </StatLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
