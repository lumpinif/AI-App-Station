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
        <header className="p-4 px-8">
          <div className="flex grow-0 items-center space-x-4 sm:w-24 md:flex">
            <Link href="/">
              <Icons.logo className="h-8 w-8 stroke-[1.5px]" />
            </Link>
            <Link
              href="/"
              className="md:text text-nowrap font-semibold sm:hidden lg:flex"
            >
              AI App Station
            </Link>
          </div>
          <div className="sm:hidden">
            <MobileNav />
          </div>
        </header>
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
