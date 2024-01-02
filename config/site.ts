export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "OpenmindAI App Store",
  url: "https://openmindai.io",
  ogImage: "https://openmindai.io/og.jpg",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS. The only AI App Store you need to make you stay ahead of 99% of people",
  mainNav: [
    {
      title: "Today",
      href: "/today",
    },
    {
      title: "AI Apps",
      href: "/ai-apps",
    },
    {
      title: "Reels",
      href: "/reels",
    },
    {
      title: "Search",
      href: "/search",
    },
  ],
  links: {
    twitter: "",
    github: "",
    docs: "",
  },
}
