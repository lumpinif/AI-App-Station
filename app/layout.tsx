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
import { SiteFooter } from "@/components/layout/site-footer/site-footer"
import { SiteHeader } from "@/components/layout/site-header/site-header"
import { TailwindIndicator } from "@/components/theme/tailwind-indicator"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
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
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.authors[0].twitter,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
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
        <QueryProvider>
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <div vaul-drawer-wrapper="">
              <section className="relative flex min-h-screen flex-col bg-background">
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
              </section>
              <TailwindIndicator />
              <SonnerToaster richColors position="bottom-right" />
            </div>
          </ThemeProvider>
        </QueryProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
