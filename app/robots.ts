import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || "https://orbitpax.com";
  const allowRobots = process.env.ALLOW_ROBOTS === "true";

  if (!allowRobots) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/support"],
      disallow: "/app/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
