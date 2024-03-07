"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { SIDENAVROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"

import { TagsList } from "./tags-list"

export function MobileCategoryNav() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname.includes(href)

  return (
    <div className="sm:hidden">
      <div className="flex flex-col">
        <div className="scrollbar-none flex gap-x-6 overflow-x-auto py-1 sm:hidden">
          {SIDENAVROUTES.map((route) => (
            <Link
              key={route.href}
              href={`${route.href}`}
              className={cn(
                "relative flex items-center gap-x-2 whitespace-nowrap transition-colors ease-out focus-visible:ring-4 focus-visible:ring-ring",
                isActive(`${route.href}`)
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-primary"
              )}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {isActive(`${route.href}`) && (
                <motion.span
                  layoutId="bubble_underline"
                  className="absolute inset-0 z-10 border-b-2 border-primary pb-1 mix-blend-difference"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                />
              )}
              <span>{route.title}</span>
            </Link>
          ))}
        </div>
      </div>
      {pathname === "/ai-apps" ? null : <TagsList />}
    </div>
  )
}
