import {
  Briefcase,
  Hammer,
  Layers,
  LayoutTemplate,
  Library,
  Paintbrush2,
  PencilRuler,
  Search,
  Sparkles,
  Tags,
  Youtube,
} from "lucide-react"

export type MAINROUTESProps = {
  id: string
  href: string
  label: string
  title: string
  discription: string
  icon: JSX.Element
}[]

export type SideNavItemProps = {
  title: string
  href?: string
  items: SideNavItemProps[]
  label?: string
  disabled?: boolean
  icon?: JSX.Element
}

export type SIDENAVROUTESProps = {
  title: string
  icon?: JSX.Element
  items: SideNavItemProps[]
}[]

export const MAINROUTES: MAINROUTESProps = [
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
    id: "discover",
    href: "/discover",
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

export const SIDENAVROUTES: SIDENAVROUTESProps = [
  {
    title: "Collections",
    icon: <Library />,
    items: [
      {
        title: "Discovery",
        href: "/ai-apps/discovery",
        items: [],
        label: "New",
        icon: <Sparkles />,
      },
      {
        title: "Create",
        href: "/ai-apps/create",
        items: [],
        icon: <Paintbrush2 />,
      },
      {
        title: "Work",
        href: "/ai-apps/work",
        items: [],
        icon: <Briefcase />,
      },
      {
        title: "Develop",
        href: "/ai-apps/develop",
        items: [],
        icon: <Hammer />,
      },
      {
        title: "Design",
        href: "/ai-apps/design",
        items: [],
        icon: <PencilRuler />,
      },
    ],
  },
  {
    title: "Categories",
    icon: <Tags />,
    items: [
      {
        title: "Bussiness",
        href: "/ai-apps/categories/business",
        items: [],
      },
      {
        title: "Developer Tools",
        href: "/ai-apps/categories/developers-tools",
        items: [],
      },
      {
        title: "Education",
        href: "/ai-apps/categories/education",
        items: [],
      },
      {
        title: "Entertainment",
        href: "/ai-apps/categories/entertainment",
        items: [],
      },
      {
        title: "Finance",
        href: "/ai-apps/categories/finance",
        items: [],
      },
      {
        title: "Graphics & Design",
        href: "/ai-apps/categories/graphics-design",
        items: [],
      },
      {
        title: "Health & Fitness",
        href: "/ai-apps/categories/health-fitness",
        items: [],
      },
      {
        title: "Lifestyle",
        href: "/ai-apps/categories/lifestyle",
        items: [],
      },
      {
        title: "Medical",
        href: "/ai-apps/categories/medical",
        items: [],
      },
      {
        title: "Music",
        href: "/ai-apps/categories/music",
        items: [],
      },
      {
        title: "Photo & Video",
        href: "/ai-apps/categories/photo-video",
        items: [],
      },
      {
        title: "Productivity",
        href: "/ai-apps/categories/productivity",
        items: [],
      },
      {
        title: "Social Networking",
        href: "/ai-apps/categories/social-networking",
        items: [],
      },
      {
        title: "Sports",
        href: "/ai-apps/categories/sports",
        items: [],
      },
      {
        title: "Travel",
        href: "/ai-apps/categories/travel",
        items: [],
      },
      {
        title: "Utilities",
        href: "/ai-apps/categories/utilities",
        items: [],
      },
      {
        title: "3D",
        href: "/ai-apps/categories/3d",
        items: [],
        label: "New",
      },
    ],
  },
]
