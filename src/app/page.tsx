import FooterButton from "../components/ui/footer-button";
import HomeSection from "../components/ui/home-section";
import ProjectButton from "../components/ui/project-button";

export default function Home() {
  return (
    <div className="grid grid-rows-1 w-full place-items-center gap-24">
      <HomeSection title="Me" gap={5}>
        <h1 className="text-3xl md:text-[2.35rem] font-bold">
          Hi, I'm Jacob Moy.
        </h1>
        <div className="flex flex-col gap-5 text-lg md:text-xl tracking-wideish leading-[22px] md:leading-7 dark:text-zinc-400">
          <p>
            My journey with computers began at the age of five when I playfully
            removing keycaps from an old laptop.
          </p>
          <p>
            This early curiosity quickly evolved into a passion for creating
            video games, designing and developing websites, and exploring
            cutting-edge technologies.
          </p>
          <p>
            Presently, I am pursuing a degree in computer science at the
            University of California, Irvine, with a focus on systems and
            software. I anticipate graduating in June 2026.
          </p>
        </div>
      </HomeSection>
      <HomeSection title="Projects" gap={6}>
        <ProjectButton
          imgSrc="/logo-zm.webp"
          href="https://github.com/icssc/ZotMeal"
          title="ZotMeal"
          shortDesc="Discover dining options and plan meals at UC Irvine."
          tags="Tool,Web,UCI"
        />
        <ProjectButton
          imgSrc="/logo-zm.webp"
          href="https://github.com/EightBitByte/leetcode-watcher"
          title="LeetCode Watcher"
          shortDesc="Monitor friends' progress and get live updates without leaving Discord."
          tags="Bot,Discord"
        />
        <ProjectButton
          imgSrc="/exsanguination.webp"
          href="https://github.com/EightBitByte/exsanguination"
          title="Exsanguination"
          shortDesc="Defend against the encroaching virus and infected hordes."
          tags="Game,WIP"
        />
      </HomeSection>
      <HomeSection title="Contact" gap={4}>
        <div className="dark:text-zinc-400 text-lg md:text-xl tracking-wideish leading-[22px] md:leading-7 flex flex-col gap-5">
          <p>
            <a
              href="mailto:jacob.anthony.moy@gmail.com"
              rel="noreferrer"
              className="text-link"
            >
              Send me an email
            </a>
            , I'd be happy to talk with you about how I can contribute to your
            next big thing.
          </p>
          <p>
            Check out more of{" "}
            <a
              href="https://github.com/EightBitByte"
              rel="noreferrer"
              className="text-link"
            >
              my work on GitHub
            </a>{" "}
            and{" "}
            <a
              href="https://linkedin.com/in/moy-jacob"
              rel="noreferrer"
              className="text-link"
            >
              sneak a peek at my LinkedIn.
            </a>
          </p>
          <p>
            If you're interested in getting to know more about me,{" "}
            <a
              href="https://blog.jacobmoy.com"
              rel="noreferrer"
              className="text-link"
            >
              peep my blog.
            </a>
          </p>
        </div>
      </HomeSection>

      <div className="mt-2 mb-4 flex flex-row gap-5 items-center">
        <FooterButton
          href="https://github.com/EightBitByte"
          iconSrc="/github.svg"
        />
        <FooterButton
          href="https://linkedin.com/in/moy-jacob"
          iconSrc="/linkedin.svg"
        />
        <FooterButton
          href="mailto:jacob.anthony.moy@gmail.com"
          iconSrc="/inbox.svg"
        />
        <FooterButton href="https://blog.jacobmoy.com" iconSrc="/blog.svg" />
        <FooterButton
          href="https://jacobmoy.com/quick-links"
          iconSrc="/link.svg"
        />
      </div>
    </div>
  );
}
