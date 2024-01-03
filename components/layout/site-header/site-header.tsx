"use client"

import useMediaQuery from "@/hooks/use-media-query"

import FloatingNav from "./floating-nav"
import LogoHeader from "./logo-header"
import MobileNav from "./mobile-nav"

export function SiteHeader() {
  const { isMobile } = useMediaQuery()

  if (isMobile)
    return (
      <>
        <MobileNav />
        <LogoHeader />
      </>
    )

  return (
    <>
      <FloatingNav />
      <LogoHeader />
    </>
  )
}
