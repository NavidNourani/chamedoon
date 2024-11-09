import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment variable or default
  const baseUrl = process.env.NEXTAUTH_URL || "https://nightly.orbitpax.com";

  // Static routes
  const staticRoutes = [
    "",
    "/support",
    // Add more static routes here
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "" ? "daily" : ("monthly" as "daily" | "monthly"),
    priority: route === "" ? 1 : 0.8,
  }));

  // You can also add dynamic routes from your database
  // Example with blog posts or other dynamic content:
  /*
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const dynamicRoutes = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  */

  return [...staticRoutes /* , ...dynamicRoutes */];
}
