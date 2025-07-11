import { Book, Github, Instagram, Keyboard, Linkedin, Smile, Users } from "lucide-react";

const categoryIconSize = 26;
const linkIconSize = 22;

const links = [
  {
    title: "Socials",
    icon: <Users size={categoryIconSize}/>,
    links: [
      {
        title: "Instagram",
        link: "https://instagram.com/jacob-moyai",
        icon: <Instagram size={linkIconSize}/>,
      },
      {
        title: "LinkedIn",
        link: "https://linkedin.com/in/moy-jacob",
        icon: <Linkedin size={linkIconSize}/>,
      },
      {
        title: "GitHub",
        link: "https://github.com/EightBitByte",
        icon: <Github size={linkIconSize}/>,
      }
    ]
  },
  {
    title: "Fun",
    icon: <Smile size={categoryIconSize}/>,
    links: [
      {
        title: "MonkeyType",
        link: "https://monkeytype.com/profile/EightBitByte",
        icon: <Keyboard size={linkIconSize}/>
      },
      {
        title: "GoodReads",
        link: "https://www.goodreads.com/user/show/190506359-jacob-moy",
        icon: <Book size={linkIconSize}/>
      }
    ]
  }
]


export default function QuickLinks() {
  return (
    <div className="flex flex-row flex-wrap w-3xl mx-auto">
      {links.map((category) => 
        <div key={category.title} className="grid grid-cols-1 gap-2 p-8 h-fit">
          <div className="flex flex-row gap-4 items-center">
            {category.icon}
            <h1 className="font-bold text-2xl">{category.title}</h1>
          </div>
          <div className="pl-6 grid grid-cols-1 gap-1">
            {category.links.map((link) => 
              <a key={link.title} 
                 href={link.link} 
                 className="flex flex-row gap-2 items-center text-lg
                            hover:translate-x-2 ease-in-out transition-transform">
                {link.icon}
                <h2>{link.title}</h2>
              </a>
            )}
          </div>
        </div>
      )}
    </div> 
  )
}