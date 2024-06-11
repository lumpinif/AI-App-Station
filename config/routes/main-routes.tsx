import {
  Briefcase,
  Hammer,
  Home,
  Layers,
  LayoutTemplate,
  Library,
  LucideIcon,
  Paintbrush2,
  PencilRuler,
  Search,
  Sparkles,
  SquarePen,
  Tags,
  Upload,
  UserCog,
  Youtube,
} from "lucide-react"
import { IconType } from "react-icons/lib"
import { RiOpenaiFill } from "react-icons/ri"

export type NavItemProps = {
  id?: string
  title: string
  href: string
  items?: NavItemProps[]
  label?: string
  disabled?: boolean
  icon?: LucideIcon | IconType
  shortcutNumber?: number
  discription?: string
  inMainNav?: boolean
}

export type SIDENAVROUTE = {
  title: string
  icon?: LucideIcon | IconType
  href: string
  items: NavItemProps[]
}

export type SIDENAVROUTESProps = SIDENAVROUTE[]

export const MAINROUTES: NavItemProps[] = [
  {
    id: "home",
    href: "/",
    title: "Home",
    discription: "Home Page of AI App Station",
    icon: Home,
    shortcutNumber: 1,
    inMainNav: false,
  },
  {
    id: "today",
    href: "/today",
    title: "Today",
    discription: "Everything you need to new about AI today",
    icon: LayoutTemplate,
    shortcutNumber: 2,
    inMainNav: true,
  },
  {
    id: "ai-apps",
    href: "/ai-apps",
    title: "AI Apps",
    discription: "Check out all the most powerful AI Apps by collections",
    icon: Layers,
    shortcutNumber: 3,
    inMainNav: true,
  },
  {
    id: "story",
    href: "/stories",
    title: "Stories",
    discription: "Check out all the brilliant stories written by the community",
    icon: Sparkles,
    shortcutNumber: 4,
    inMainNav: true,
  },
  // {
  //   id: "discover",
  //   href: "/discover",
  //   title: "Discover",
  //   discription:
  //     "Check out all the most powerful AI Apps by scrolling reels just like TikTok",
  //   icon: Sparkles,
  //   shortcutNumber: 4,
  //   inMainNav: true,
  // },
  // {
  //   id: "search",
  //   href: "/search",
  //   title: "Search",
  //   discription: "Search for the best AI apps for your needs",
  //   icon: Search,
  //   shortcutNumber: 4,
  //   inMainNav: true,
  // },
  {
    id: "create story",
    href: "/story/new",
    title: "Write Story",
    discription: "Write brilliant stories for the whole world to see",
    icon: SquarePen,
    shortcutNumber: 5,
    inMainNav: false,
  },
  {
    id: "submit",
    href: "/submit",
    title: "Submit App",
    discription: "Submit best AI apps for the whole world to see",
    icon: Upload,
    shortcutNumber: 6,
    inMainNav: false,
  },
  {
    id: "user",
    href: "/user",
    title: "Account",
    discription: "Manage your account",
    icon: UserCog,
    shortcutNumber: 7,
    inMainNav: false,
  },
]

export const SIDENAVROUTES: SIDENAVROUTESProps = [
  // ***** IMPORTANT FOR UPDATING href AND shortcutNumber *****//
  // REMEMBER TO MANUELLY UPDATE THE FLOAITNG SIDE NAV COMPONENT CONFIG FOR THE ROUTES//
  {
    title: "Collections",
    href: "/ai-apps/collections",
    icon: Library,
    items: [
      {
        title: "Create",
        href: "/ai-apps/collections/create",
        items: [],
        icon: Paintbrush2,
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
        icon: Hammer,
        shortcutNumber: 2,
      },
      {
        title: "Design",
        href: "/ai-apps/collections/design",
        items: [],
        icon: PencilRuler,
        shortcutNumber: 3,
      },
      {
        title: "GPTs",
        href: "/ai-apps/collections/gpts",
        items: [],
        icon: RiOpenaiFill,
        shortcutNumber: 4,
      },
      {
        title: "Work",
        href: "/ai-apps/collections/work",
        items: [],
        icon: Briefcase,
        shortcutNumber: 5,
      },
    ],
  },
  {
    title: "Categories",
    href: "/ai-apps/categories",
    icon: Tags,
    items: [
      {
        title: "LLM",
        href: "/ai-apps/categories/llm",
        items: [],
      },
      {
        title: "Bussiness",
        href: "/ai-apps/categories/bussiness",
        items: [],
      },
      {
        title: "Writing",
        href: "/ai-apps/categories/writing",
        items: [],
      },
      {
        title: "Develop",
        href: "/ai-apps/categories/develop",
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
        title: "Photo",
        href: "/ai-apps/categories/photo",
        items: [],
      },
      {
        title: "Video",
        href: "/ai-apps/categories/video",
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
