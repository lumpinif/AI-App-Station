import Link from "next/link"

import { Icons } from "@/components/icons/icons"
import MobileNav from "@/components/layout/landing-page-header/mobile-nav"

import FloatingSideNav from "../../components/layout/side-menu/floating-side-nav"

interface MainAppLayoutProps {
  children: React.ReactNode
}
export default async function MainAppLayout({ children }: MainAppLayoutProps) {
  return (
    <>
      <div className="flex h-dvh flex-col">
        <div className="sm:hidden">
          <MobileNav />
        </div>
        <div className="h-full flex-1 gap-2 sm:grid sm:grid-cols-[110px_minmax(0,1fr)]">
          <div className="hidden h-full flex-col justify-center sm:flex">
            <FloatingSideNav />
          </div>
          <main className="h-full">
            {/* TODO: CONSIDERIGN ADD PROGRESSIVE BLUR TO THE EDGE OF THE SCROLLAREA */}
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
