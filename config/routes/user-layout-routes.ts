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

export interface UserLayoutRouteItemProps {
  title: string
  label?: string
  href: string
  icon: LucideIcon
  description?: string
}

export interface UserLayoutRouteProps {
  group: string
  items: UserLayoutRouteItemProps[]
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
        description: "Your favorite apps or stories",
      },
      {
        title: "Bookmarks",
        href: "/user/bookmarks",
        label: "",
        icon: Bookmark,
        description: "Your bookmarked apps or stories",
      },
      {
        title: "Submitted Apps",
        href: "/user/apps",
        label: "",
        icon: ListTodo,
        description: "Table of apps your submitted",
      },
      {
        title: "Posted Stories",
        href: "/user/stories",
        label: "",
        icon: FileText,
        description: "Table of stories you posted",
      },
    ],
  },
  // {
  //   group: "General",
  //   items: [
  //     {
  //       title: "Profile Settings",
  //       href: "/user/settings",
  //       label: "",
  //       icon: Settings,
  //     },
  //   ],
  // },
]
