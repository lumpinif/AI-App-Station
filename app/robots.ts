import { MetadataRoute } from "next"

import { BASE_URL } from "@/lib/constants/site-constants"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/ai-apps", "/stories", "/today"],
      disallow: [],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
