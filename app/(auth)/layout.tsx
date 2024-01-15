import "@/styles/globals.css"
import { Metadata } from "next"

import AuthPageHeader from "@/components/auth/auth-page-header"

export const metadata: Metadata = {
  title: "Sign In to OpenmindAI Apps and News Station",
  description:
    "Sign In to OpenmindAI Apps and News Station by using goolge, github or email.",
}

interface SignInLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: SignInLayoutProps) {
  return (
    <>
      <AuthPageHeader />
      <div className="absolute flex min-h-dvh min-w-full">
        <div className="mx-auto flex w-full px-4">{children}</div>
      </div>
    </>
  )
}
