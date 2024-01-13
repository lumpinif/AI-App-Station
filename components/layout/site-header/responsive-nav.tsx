"use client"

import { Session } from "@supabase/auth-helpers-nextjs"

import useMediaQuery from "@/hooks/use-media-query"

import FloatingNav from "./floating-nav"
import LogoHeaderWrapper from "./logo-header-wrapper"
import MobileNav from "./mobile-nav"

export function ResponsiveNav({ session }: { session: Session | null }) {
  const { isMobile } = useMediaQuery()

  return (
    <>
      <LogoHeaderWrapper session={session}>
        {isMobile ? <MobileNav /> : <FloatingNav />}
      </LogoHeaderWrapper>
    </>
  )
}
