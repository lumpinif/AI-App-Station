import { Metadata } from "next"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
}

interface MainAppLayoutProps {
  children: React.ReactNode
}

export default function MainAppLayouProps({ children }: MainAppLayoutProps) {
  return <>{children}</>
}
