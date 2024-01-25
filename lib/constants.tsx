import {
  ArmchairIcon,
  BookmarkIcon,
  GithubIcon,
  InstagramIcon,
  Layers,
  LayoutTemplate,
  LinkedinIcon,
  LucideIcon,
  NavigationIcon,
  PencilLineIcon,
  Search,
  SparklesIcon,
  TwitterIcon,
  Wand2Icon,
  Youtube,
  YoutubeIcon,
} from "lucide-react"

interface Profile {
  title: string
  username?: string
  url: string
  icon?: JSX.Element // Icon is optional
}

export const PROFILES: Record<string, Profile> = {
  twitter: {
    title: "Twitter",
    username: "onurschu",
    url: "https://twitter.com/intent/user?screen_name=onurschu",
    icon: <TwitterIcon size={16} />,
  },
  github: {
    title: "GitHub",
    url: "https://github.com/suyalcinkaya",
    icon: <GithubIcon size={16} />,
  },
  linkedin: {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/suyalcinkaya",
    icon: <LinkedinIcon size={16} />,
  },
  medium: {
    title: "Medium",
    url: "https://suyalcinkaya.medium.com",
  },
  instagram: {
    title: "Instagram",
    url: "https://www.instagram.com/jgrmn",
    icon: <InstagramIcon size={16} />,
  },
  soundcloud: {
    title: "Soundcloud",
    url: "https://soundcloud.com/jagerman",
  },
  youtube: {
    title: "YouTube",
    url: "https://www.youtube.com/c/jagermanmusic",
    icon: <YoutubeIcon size={16} />,
  },
  bluesky: {
    title: "Bluesky",
    url: "https://staging.bsky.app/profile/onur.dev",
  },
  readcv: {
    title: "Read.cv",
    url: "https://read.cv/onur",
  },
  pinterest: {
    title: "Pinterest",
    url: "https://nl.pinterest.com/onurschu",
  },
}

export const SCROLL_AREA_ID = "scroll-area"
