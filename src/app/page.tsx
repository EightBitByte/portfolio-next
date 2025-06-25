import Toolbar from "./components/ui/toolbar";
import HomeSection from "./components/ui/home-section";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HomeSection title="Me">
        <h1 className="text-4xl font-bold">Hi, I'm Jacob Moy.</h1>
        <div className="flex flex-col gap-5 text-xl tracking-wideish">
          <p>My journey with computers began at the age of five when I playfully removing keycaps from an old laptop.</p>
          <p>This early curiosity quickly evolved into a passion for creating video games, designing and developing websites, and exploring cutting-edge technologies.</p>
          <p>Presently, I am pursuing a degree in computer science at the University of California, Irvine, with a focus on systems and software. I anticipate graduating in June 2026.</p>
        </div>
      </HomeSection>
    </div>
  )
}
