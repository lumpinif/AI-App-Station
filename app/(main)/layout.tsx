import Link from "next/link"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Icons } from "@/components/icons/icons"
import MobileNav from "@/components/layout/site-header/mobile-nav"

import FloatingSideNav from "../../components/layout/side-menu/floating-side-nav"

interface MainAppLayoutProps {
  children: React.ReactNode
}
export default async function MainAppLayout({ children }: MainAppLayoutProps) {
  return (
    <>
      <header className="p-4 px-8 ">
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
      <div className="min-h-dvh w-full">
        <div className="flex-1 items-start gap-2 sm:grid sm:grid-cols-[110px_minmax(0,1fr)]">
          <div className="hidden h-dvh flex-col justify-center sm:flex">
            <FloatingSideNav />
          </div>
          <main className="my-2 h-dvh">
            {/* TODO: CONSIDERIGN ADD PROGRESSIVE BLUR TO THE EDGE OF THE SCROLLAREA */}
            <ScrollArea className="h-full rounded-3xl py-2 shadow-outline">
              {children}
            </ScrollArea>
          </main>
        </div>
      </div>
    </>
  )
}
