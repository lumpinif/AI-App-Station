import {
  Bookmark,
  FileText,
  Heart,
  LayoutDashboard,
  ListTodo,
  LucideIcon,
  Search,
  Settings,
} from "lucide-react"

export interface UserLayoutRouteProps {
  group: string
  items: {
    title: string
    label?: string
    href: string
    icon: LucideIcon
    description?: string
  }[]
}

export const userLayoutRoutes: UserLayoutRouteProps[] = [
  {
    group: "Search",
    items: [
      // {
      //   title: 'Dashboard',
      //   href: '/dashboard',
      //   label: '',
      //   icon: LayoutDashboard,
      // },
      {
        title: "Search",
        href: "/search",
        label: "",
        icon: Search,
      },
    ],
  },
  {
    group: "User",
    items: [
      {
        title: "Favorites",
        href: "/user/favorites",
        label: "",
        icon: Heart,
        description: "Your favorite apps",
      },
      {
        title: "Bookmarks",
        href: "/user/bookmarks",
        label: "",
        icon: Bookmark,
        description: "Your bookmarked apps",
      },
      {
        title: "Submitted Apps",
        href: "/user/apps",
        label: "",
        icon: ListTodo,
        description: "Table of apps your submitted",
      },
      {
        title: "Posts",
        href: "/user/posts",
        label: "",
        icon: FileText,
        description: "Table of posts you submitted",
      },
    ],
  },
  {
    group: "General",
    items: [
      {
        title: "Profile Settings",
        href: "/user/settings",
        label: "",
        icon: Settings,
      },
    ],
  },
]
