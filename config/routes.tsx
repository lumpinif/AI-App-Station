import { Layers, LayoutTemplate, Search, Youtube } from "lucide-react"

export const mainroutes: {
  id: string
  label: string
  href: string
  title: string
  discription: string
  icon: JSX.Element
}[] = [
  {
    id: "today",
    href: "/today",
    label: "Today",
    title: "Today",
    discription: "Everything you need to new about AI today",
    icon: <LayoutTemplate width={18} />,
  },
  {
    id: "ai-apps",
    href: "/ai-apps",
    label: "AI Apps",
    title: "AI Apps",
    discription: "Check out all the most powerful AI Apps by collections",
    icon: <Layers width={18} />,
  },
  // {
  //   id: "gpts",
  //   href: "/gpts",
  //   label: "GPTs",
  //   title: "GPTs",
  //   discription: "",
  //   icon: <RiOpenaiFill size={24} />,
  // },
  {
    id: "discorver",
    href: "/discorver",
    label: "Discover",
    title: "Discover",
    discription:
      "Check out all the most powerful AI Apps by scrolling reels just like TikTok",
    icon: <Youtube width={18} />,
  },
  {
    id: "search",
    href: "/search",
    label: "Search",
    title: "Search",
    discription: "Search for the best AI apps for your needs",
    icon: <Search width={18} />,
  },
]
