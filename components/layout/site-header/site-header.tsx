"use client"

import useMediaQuery from "@/hooks/use-media-query"

import FloatingNav from "./floating-nav"
import LogoHeaderWrapper from "./logo-header-wrapper"
import MobileNav from "./mobile-nav"

export function SiteHeader() {
  const { isMobile } = useMediaQuery()

  return (
    <>
      <LogoHeaderWrapper>
        {isMobile ? <MobileNav /> : <FloatingNav />}
      </LogoHeaderWrapper>
    </>
  )
}
