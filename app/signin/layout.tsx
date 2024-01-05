import "@/styles/globals.css"
import { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/provider/theme-provider"
import { GeistSans } from "geist/font/sans"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import SignInPageHeader from "@/components/auth/sign-in-page-header"
import { SiteFooter } from "@/components/layout/site-footer/site-footer"
import { SiteHeader } from "@/components/layout/site-header/site-header"
import { TailwindIndicator } from "@/components/theme/tailwind-indicator"

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
      <div className="absolute">
        <SignInPageHeader />
      </div>
      <div className="flex min-h-dvh">{children}</div>
    </>
  )
}
