import Artifacts from "@/public/logos/artifacts"
import {
  Bookmark,
  Briefcase,
  CalendarFold,
  DraftingCompass,
  FileText,
  Hammer,
  Heart,
  Home,
  LayoutTemplate,
  Library,
  ListTodo,
  LucideIcon,
  Newspaper,
  Paintbrush2,
  PencilRuler,
  Search,
  SquarePen,
  Tags,
  Upload,
  User,
} from "lucide-react"
import { IconType } from "react-icons/lib"
import { RiOpenaiFill } from "react-icons/ri"

import { User_role } from "@/types/db_tables"
import { AppFetchConfig } from "@/types/fetch-configs/types-app-fetch-config"

export type NavItemProps = {
  id?: string
  href: string
  title: string
  label?: string
  disabled?: boolean
  fullTitle?: string
  inMainNav?: boolean
  description?: string
  inMobileNav?: boolean
  items?: NavItemProps[]
  shortcutNumber?: number
  icon?: LucideIcon | IconType
  fetchConfig?: AppFetchConfig
  roleAllowed?: User_role[]
}

export const MAINROUTES: NavItemProps[] = [
  {
    id: "foryou",
    href: "/foryou",
    title: "For You",
    description: "Home Page of AI App Station with AI Apps for you",
    icon: Home,
    shortcutNumber: 1,
    inMainNav: true,
    inMobileNav: false,
    disabled: true,
  },
  {
    id: "ai-apps",
    href: "/ai-apps",
    title: "AI Apps",
    fullTitle: "Discover AI Apps",
    description: "Check out all the most powerful AI Apps by collections",
    icon: DraftingCompass,
    shortcutNumber: 2,
    inMainNav: true,
    inMobileNav: true,
  },
  {
    id: "story",
    href: "/stories",
    title: "Stories",
    fullTitle: "Explore Stories",
    description: "Check out all the brilliant stories written by the community",
    icon: Newspaper,
    shortcutNumber: 3,
    inMainNav: true,
    inMobileNav: true,
  },
  {
    id: "user",
    href: "/user",
    title: "Profile",
    fullTitle: "Your Profile",
    description: "Manage your account",
    icon: User,
    shortcutNumber: 4,
    inMainNav: true,
    inMobileNav: false,
  },
  {
    id: "today",
    href: "/today",
    title: "Today",
    description: "Everything you need to new about AI today",
    icon: LayoutTemplate,
    shortcutNumber: 5,
    inMainNav: true,
    inMobileNav: true,
  },
  // {
  //   id: "discover",
  //   href: "/discover",
  //   title: "Discover",
  //   description:
  //     "Check out all the most powerful AI Apps by scrolling reels just like TikTok",
  //   icon: Sparkles,
  //   shortcutNumber: 4,
  //   inMainNav: true,
  // },
  {
    id: "search",
    href: "/search",
    title: "Search",
    description: "Search for the best AI apps for your needs",
    icon: Search,
    shortcutNumber: 6,
    inMainNav: false,
    inMobileNav: false,
  },
  {
    id: "create story",
    href: "/story/new",
    title: "Write Story",
    description: "Write brilliant stories for the whole world to see",
    icon: SquarePen,
    shortcutNumber: 7,
    inMainNav: false,
  },
  {
    id: "submit",
    href: "/submit",
    title: "Submit App",
    description: "Submit best AI apps for the whole world to see",
    icon: Upload,
    shortcutNumber: 8,
    inMainNav: false,
  },
]

export const AIAPPSPAGENAVROUTES: NavItemProps[] = [
  // ***** IMPORTANT FOR UPDATING href AND shortcutNumber *****//
  // REMEMBER TO MANUELLY UPDATE THE FLOAITNG SIDE NAV COMPONENT CONFIG FOR THE ROUTES//
  {
    title: "Collections",
    href: "/ai-apps/collections",
    icon: Library,
    items: [
      {
        title: "Create",
        description: "Apps for writing, llm, video, photo, 3D, and more",
        href: "/ai-apps/collections/create",
        items: [],
        icon: Paintbrush2,
        shortcutNumber: 1,
        fetchConfig: {
          title: "AI Apps for Create",
          order: [
            {
              column: "likes_count",
              options: { ascending: false },
            },
          ],
          // limit: {
          //   limit: 15,
          // },
          orFilters: [
            {
              filters:
                "category_slug.eq.writing,category_slug.eq.llm,category_slug.eq.video,category_slug.eq.photo,category_slug.eq.3d,category_slug.eq.graphics-design,category_slug.eq.music",
              options: { referencedTable: "categories" },
            },
          ],
          innerJoinTables: ["categories"],
        },
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
        description: "Apps for develop, productivity, utilities, and more",
        href: "/ai-apps/collections/develop",
        items: [],
        icon: Hammer,
        shortcutNumber: 2,
        fetchConfig: {
          title: "AI Apps for Develop",
          order: [
            {
              column: "likes_count",
              options: { ascending: false },
            },
          ],
          // limit: {
          //   limit: 15,
          // },
          orFilters: [
            {
              filters:
                "category_slug.eq.productivity,category_slug.eq.llm,category_slug.eq.utilities,category_slug.eq.develop,category_slug.eq.3d,category_slug.eq.graphics-design",
              options: { referencedTable: "categories" },
            },
          ],
          innerJoinTables: ["categories"],
        },
      },
      {
        title: "Design",
        description: "Apps for design, photo, video, 3D, and more",
        href: "/ai-apps/collections/design",
        items: [],
        icon: PencilRuler,
        shortcutNumber: 3,
        fetchConfig: {
          title: "AI Apps for Design",
          order: [
            {
              column: "likes_count",
              options: { ascending: false },
            },
          ],
          // limit: {
          //   limit: 15,
          // },
          orFilters: [
            {
              filters:
                "category_slug.eq.video,category_slug.eq.utilities,category_slug.eq.photo,category_slug.eq.3d,category_slug.eq.graphics-design",
              options: { referencedTable: "categories" },
            },
          ],
          innerJoinTables: ["categories"],
        },
      },
      {
        title: "Artifacts",
        description:
          "A list of Claude's Artifacts Shared by others, and you can share yours by submit an app and select artifacts as the category",
        href: "/ai-apps/collections/artifacts",
        items: [],
        icon: Artifacts,
        shortcutNumber: 4,
        fetchConfig: {
          title: "Claude's Artifacts AI Apps",
          order: [
            {
              column: "likes_count",
              options: { ascending: false },
            },
          ],
          // limit: {
          //   limit: 15,
          // },
          orFilters: [
            {
              filters: "category_slug.eq.artifacts,category_slug.eq.claude",
              options: { referencedTable: "categories" },
            },
          ],
          innerJoinTables: ["categories"],
        },
      },
      {
        title: "GPTs",
        description: "A list of Openai's GPTs Shared by others",
        href: "/ai-apps/collections/gpts",
        items: [],
        icon: RiOpenaiFill,
        shortcutNumber: 5,
        fetchConfig: {
          title: "GPTs AI Apps",
          order: [
            {
              column: "likes_count",
              options: { ascending: false },
            },
          ],
          // limit: {
          //   limit: 15,
          // },
          // filters: [{ column: "is_gpt", operator: "eq", value: true }],
          orFilters: [
            {
              filters: "category_slug.eq.gpt,category_slug.eq.gpts",
              options: { referencedTable: "categories" },
            },
          ],
          innerJoinTables: ["categories"],
        },
      },
      {
        title: "Work",
        description: "Apps for work, productivity, finance, and more",
        href: "/ai-apps/collections/work",
        items: [],
        icon: Briefcase,
        shortcutNumber: 6,
        fetchConfig: {
          title: "AI Apps for Work",
          order: [
            {
              column: "likes_count",
              options: { ascending: false },
            },
          ],
          // limit: {
          //   limit: 15,
          // },
          orFilters: [
            {
              filters:
                "category_slug.eq.bussiness,category_slug.eq.video,category_slug.eq.utilities,category_slug.eq.photo,category_slug.eq.llm,category_slug.eq.graphics-design,category_slug.eq.productivity,category_slug.eq.finance",
              options: { referencedTable: "categories" },
            },
          ],
          innerJoinTables: ["categories"],
        },
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

export const USERPAGESNAVROUTES: NavItemProps[] = [
  {
    title: "Liked",
    href: "/user/favorites",
    icon: Heart,
    description: "Your favorite apps or stories",
    shortcutNumber: 1,
  },
  {
    title: "Bookmarks",
    href: "/user/bookmarks",
    icon: Bookmark,
    description: "Your bookmarked apps or stories",
    shortcutNumber: 2,
  },
  {
    title: "Submitted Apps",
    href: "/user/apps",
    icon: ListTodo,
    description: "Table of apps your submitted",
    shortcutNumber: 3,
  },
  {
    title: "Posted Stories",
    href: "/user/stories",
    icon: FileText,
    description: "Table of stories you posted",
    shortcutNumber: 4,
  },
  {
    title: "Daily Posts",
    href: "/user/daily-posts",
    icon: CalendarFold,
    description: "Table of daily posts you created",
    shortcutNumber: 5,
    roleAllowed: ["admin", "super_admin", "super_user"],
  },
]
