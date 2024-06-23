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
    creator: "@felixlyu_1018",
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
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          GeistSans.variable
        )}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main
              className="relative flex min-h-dvh flex-col bg-background"
              vaul-drawer-wrapper=""
            >
              <section className="min-h-dvh flex-1">
                <section className="flex h-full flex-col">
                  <SiteHeader />
                  <main className="mb-2 h-full flex-1">{children}</main>
                </section>
              </section>
              <SiteFooter />
            </main>
            <TailwindIndicator />
            <SonnerToaster richColors position="bottom-right" />
          </ThemeProvider>
        </QueryProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
