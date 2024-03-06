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
import { RiOpenaiFill } from "react-icons/ri"

export type NavItemProps = {
  id?: string
  title: string
  href?: string
  items?: NavItemProps[]
  label?: string
  disabled?: boolean
  icon?: JSX.Element
  shortcutNumber?: number
  discription?: string
}

export type SIDENAVROUTESProps = {
  title: string
  icon?: JSX.Element
  href?: string
  items: NavItemProps[]
}[]

export const MAINROUTES: NavItemProps[] = [
  {
    id: "today",
    href: "/today",
    title: "Today",
    discription: "Everything you need to new about AI today",
    icon: <LayoutTemplate width={18} />,
    shortcutNumber: 1,
  },
  {
    id: "ai-apps",
    href: "/ai-apps",
    title: "AI Apps",
    discription: "Check out all the most powerful AI Apps by collections",
    icon: <Layers width={18} />,
    shortcutNumber: 2,
  },
  // {
  //   id: "gpts",
  //   href: "/gpts",
  //   title: "GPTs",
  //   discription: "",
  //   icon: <RiOpenaiFill size={24} />,
  // },
  {
    id: "discover",
    href: "/discover",
    title: "Discover",
    discription:
      "Check out all the most powerful AI Apps by scrolling reels just like TikTok",
    icon: <Sparkles width={18} />,
    shortcutNumber: 3,
  },
  {
    id: "search",
    href: "/search",
    title: "Search",
    discription: "Search for the best AI apps for your needs",
    icon: <Search width={18} />,
    shortcutNumber: 4,
  },
]

export const SIDENAVROUTES: SIDENAVROUTESProps = [
  // ***** IMPORTANT FOR UPDATING href AND shortcutNumber *****//
  // REMEMBER TO MANUELLY UPDATE THE FLOAITNG SIDE NAV COMPONENT CONFIG FOR THE ROUTES//
  // {
  //   title: "Home Pages",
  //   href: "/",
  //   icon: <Home />,
  //   items: MAINROUTES,
  // },
  {
    title: "Collections",
    href: "/ai-apps/collections",
    icon: <Library />,
    items: [
      {
        title: "Create",
        href: "/ai-apps/collections/create",
        items: [],
        icon: <Paintbrush2 width={"20"} />,
        shortcutNumber: 1,
      },
      // {
      //   title: "Discovery",
      //   href: "/ai-apps/collections/discovery",
      //   items: [],
      //   // label: "New",
      //   icon: <Sparkles width={"20"} />,
      //   shortcutNumber: 2,
      // },
      {
        title: "Develop",
        href: "/ai-apps/collections/develop",
        items: [],
        icon: <Hammer width={"20"} />,
        shortcutNumber: 2,
      },
      {
        title: "Design",
        href: "/ai-apps/collections/design",
        items: [],
        icon: <PencilRuler width={"18"} />,
        shortcutNumber: 3,
      },
      {
        title: "GPTs",
        href: "/ai-apps/collections/gpts",
        items: [],
        icon: <RiOpenaiFill size={"24"} />,
        shortcutNumber: 4,
      },
      {
        title: "Work",
        href: "/ai-apps/collections/work",
        items: [],
        icon: <Briefcase width={"20"} />,
        shortcutNumber: 5,
      },
    ],
  },
  {
    title: "Categories",
    href: "/ai-apps/categories",
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

export const CATEGORIES: SIDENAVROUTESProps = [
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
