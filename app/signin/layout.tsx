import "@/styles/globals.css"
import { Metadata } from "next"

import SignInPageHeader from "@/components/auth/sign-in-page-header"

export const metadata: Metadata = {
  title: "Sign In to OpenmindAI Apps and News Station",
  description:
    "Sign In to OpenmindAI Apps and News Station by using goolge, github or email.",
}

interface SignInLayoutProps {
  children: React.ReactNode
}

export default function SignInLayout({ children }: SignInLayoutProps) {
  return (
    <>
      <SignInPageHeader />
      <div className="flex min-h-dvh flex-col justify-center">{children}</div>
    </>
  )
}
