import Image from "next/image"

export interface FooterButtonProps {
  href: string,
  iconSrc: string
}

export default function FooterButton({
  href,
  iconSrc
} : FooterButtonProps) {
  return (
    <a href={href} rel="noreferrer" className="hover:-translate-y-2 ease-in-out 
                                               transition-transform">
      <Image
        src={iconSrc}
        alt={`An icon for a link to ${href}.`}
        width={34}
        height={34}
      />
    </a>
  )
}