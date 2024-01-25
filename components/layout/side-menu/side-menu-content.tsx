import Image from "next/image"
import Link from "next/link"
import { Compass, Layout } from "lucide-react"

import { MAINROUTES } from "@/config/routes"
import { PROFILES } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"
import UserAvatar from "@/components/auth/avatar/user-avatar"
import { DirectThemeToggle } from "@/components/theme/direct-theme-toggle"

import { NavigationLink } from "./navigation-link"

export const SideMenuContent = () => {
  return (
    <div className="flex w-full flex-col justify-between text-sm">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="link-card inline-flex items-center gap-2 p-2">
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={40}
            loading="lazy"
            className="shadow-sm"
          />
          {/* <div className="hidden lg:flex lg:flex-col">
            <span className="font-semibold tracking-tight">AI App Station</span>
            <span className="text-muted-foreground">Software Engineer</span>
          </div> */}
        </Link>
        <UserAvatar session={null} />
      </div>
      <div className="glass-card-background flex flex-col gap-1 rounded-3xl p-4 bg-blend-luminosity shadow-outline">
        {MAINROUTES.map((route, linkIndex) => (
          <NavigationLink
            key={route.href}
            href={route.href}
            label={route.label}
            icon={route.icon}
            shortcutNumber={linkIndex + 1}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 text-sm">
        {/* <Separator /> */}
        <section className="flex justify-start px-2 text-xs font-medium leading-relaxed text-muted-foreground">
          <DirectThemeToggle />
        </section>
      </div>
    </div>
  )
}
