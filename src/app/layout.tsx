import { ThemeProvider } from "@/provider/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@/styles/globals.css"
import "@/styles/prosemirror.css"

import { Metadata, Viewport } from "next"
import QueryProvider from "@/provider/query-provider"
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from "geist/font/sans"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { SiteHeader } from "@/components/layout/site-header/site-header"
import { TailwindIndicator } from "@/components/theme/tailwind-indicator"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url), // Set the base URL here
  description: siteConfig.description,
  keywords: [
    "AI App Store",
    "AI Library",
    "AI Directory",
    "AI Navigation",
    "AI News",
    "AI Today",
    "AI Tools",
    "Next.js",
    "Supabase",
    "App Store",
    "GPTs",
    "Artifacts",
  ],
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1400,
        height: 800,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      siteConfig.twitterImage,
      {
        url: siteConfig.twitterImage,
        width: 1400,
        height: 800,
        alt: siteConfig.name,
      },
    ],
    creator: siteConfig.authors[0].twitter,
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f0f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable
        )}
      >
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <QueryProvider>
            <main
              vaul-drawer-wrapper=""
              className="min-h-screen bg-background dark:md:bg-black"
            >
              <SiteHeader />
              <div className="relative bg-background dark:md:bg-black">
                {children}
              </div>
            </main>
            <SonnerToaster richColors position="bottom-right" />
            <TailwindIndicator />
          </QueryProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
