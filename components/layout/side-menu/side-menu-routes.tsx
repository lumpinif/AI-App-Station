import Image from "next/image"
import Link from "next/link"
import { Compass, Layout } from "lucide-react"

import { MAINROUTES } from "@/config/routes"
import { PROFILES } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"

import { NavigationLink } from "./navigation-link"

export const SideMenuRoutes = () => {
  return (
    <div className="flex w-full flex-col text-sm">
      <div className="flex flex-col gap-4">
        <Link href="/" className="link-card inline-flex items-center gap-2 p-2">
          <Image
            src="/public/android-chrome-192x192.png"
            alt="logo"
            width={40}
            height={40}
            loading="lazy"
            className="rounded-full border shadow-sm"
          />
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight">AI App Station</span>
            <span className="text-muted-foreground">Software Engineer</span>
          </div>
        </Link>
        <div className="flex flex-col gap-1">
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
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <Separator />
        <span className="px-2 text-xs font-medium leading-relaxed text-muted-foreground">
          Online
        </span>
        <div className="flex flex-col gap-1">
          {Object.values(PROFILES).map((profile) => (
            <NavigationLink
              key={profile.url}
              href={profile.url}
              label={profile.title}
              icon={profile.icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
