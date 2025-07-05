import BlogEntry from "../components/ui/blog-entry";

export default function Blog() {
  return (
    <div className="flex flex-row px-24 flex-wrap gap-12 justify-center">
      {Array.from({length: 12}).map((_, i) => 
        <BlogEntry
          key={i}
          title="Tom's Diner"
          slug="toms-diner"
          prevImgSrc="/logo-zm.webp"
          alt="An Image."
          shortDesc="And I look the other way as they are kissing their hellos. And instead, I poured the milk."
          createdAt={new Date()}
        />
      )}
    </div>
  )
}