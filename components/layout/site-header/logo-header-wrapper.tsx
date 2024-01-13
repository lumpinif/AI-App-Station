import Link from "next/link"
import { Session } from "@supabase/auth-helpers-nextjs"

import UserAvatar from "@/components/auth/auth-avatar"
import { Icons } from "@/components/icons/icons"
import { ThemeToggle } from "@/components/theme/theme-toggle"

interface LogoHeaderWrapperProps {
  children: React.ReactNode
  session: Session | null
}

const LogoHeaderWrapper = ({ children, session }: LogoHeaderWrapperProps) => {
  return (
    <header className="relative w-screen">
      <div className="flex h-24 items-center space-x-4 px-8 sm:justify-between sm:space-x-0">
        <div className="flex grow-0 items-center space-x-4 sm:w-24 md:flex">
          <Link href="/">
            <Icons.logo className="h-8 w-8 stroke-[1.5px]" />
          </Link>
          <Link
            href="/"
            className="font-semibold sm:hidden md:text-lg lg:flex "
          >
            OpenmindAI
          </Link>
        </div>
        <div className="flex grow items-center justify-center">{children}</div>
        <div className="flex w-24 grow-0 items-center justify-end space-x-0">
          <div className="mr-1 sm:hidden">
            <ThemeToggle />
          </div>
          <UserAvatar session={session} />
        </div>
      </div>
    </header>
  )
}

export default LogoHeaderWrapper
