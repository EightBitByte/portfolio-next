import Image from "next/image"
import ToolbarButton from "./toolbar-button"

export default function Toolbar() {
  return (
    <div className="w-full py-4 mb-10 flex flex-row justify-center items-center gap-6">
      <a href="https://jacobmoy.com" rel="noreferrer">
        <Image
          src="/logo-jm.webp"
          alt="An image of the capital letters 'JM', signifying Jacob Moy."
          width={32}
          height={32}
        />
      </a>
      <ToolbarButton title="Projects"/>
      <ToolbarButton title="Blog"/>
      <ToolbarButton title="Quick Links"/>
    </div>
  )
}