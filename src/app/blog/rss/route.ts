import { Feed } from "feed";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { posts } from "@/utils/posts";

export const dynamic = "force-static";

function remarkAbsoluteImages(options: { siteUrl: string }) {
  return (tree: any) => {
    visit(tree, "image", (node: any) => {
      if (node.url.startsWith("/")) {
        node.url = `${options.siteUrl}${node.url}`;
      }
    });
  };
}

export async function GET() {
  try {
    const allPosts = posts.getPosts();
    const latestPost = allPosts[0];
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://jacobmoy.com";
    const author = {
      name: "Jacob Moy",
      email: "me@jacobmoy.com",
      link: siteUrl,
    };

    const feed = new Feed({
      title: "Jacob Moy | Blog",
      description: "Jacob Moy's personal blog about software development, technology, and life.",
      id: siteUrl,
      link: siteUrl,
      language: "en",
      image: `${siteUrl}/favicon.ico`,
      favicon: `${siteUrl}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Jacob Moy`,
      updated: latestPost ? new Date(latestPost.date) : new Date(),
      generator: "Feed for Node.js",
      feedLinks: {
        rss2: `${siteUrl}/blog/rss`,
      },
      author: author,
    });

    for (const post of allPosts) {
      const url = `${siteUrl}/blog/posts/${post.slug}`;
      const processedContent = await remark()
        .use(remarkGfm)
        .use(remarkAbsoluteImages, { siteUrl })
        .use(html)
        .process(post.content);
      const contentHtml = processedContent.toString();

      feed.addItem({
        title: post.title,
        id: url,
        link: url,
        description: post.description,
        content: contentHtml,
        author: [author],
        contributor: [author],
        date: new Date(post.date),
        image: post.image ? `${siteUrl}${post.image}` : undefined,
      });
    }

    return new Response(feed.rss2(), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (e: any) {
    console.error(e);
    return new Response(`Error generating RSS feed: ${e.message}\n${e.stack}`, {
      status: 500,
    });
  }
}
