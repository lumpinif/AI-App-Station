import { ThemeProvider } from "@/provider/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@/styles/globals.css"

import { Metadata, Viewport } from "next"
import QueryProvider from "@/provider/query-provider"
import { GeistSans } from "geist/font/sans"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import AccountModalProvider from "@/components/auth/auth-modal/account-modal-provider"
import { SiteFooter } from "@/components/layout/site-footer/site-footer"
import { SiteHeader } from "@/components/layout/site-header/site-header"
import { SearchCommandDialogProvider } from "@/components/shared/search-command-dialog"
import { TailwindIndicator } from "@/components/theme/tailwind-indicator"

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // Set the base URL here
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI App Store",
    "AI Library",
    "AI Directory",
    "AI Navigation",
    "AI News",
    "AI Reels",
    "AI Today",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Shadcn UI",
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
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-dvh bg-background font-sans antialiased",
            GeistSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-dvh flex-col bg-background">
                {/* TODO: MAYBE WRAP THE COMMANDDIAGLOG OR MOVE SOMEWHERE ELSE */}
                <QueryProvider>
                  <SearchCommandDialogProvider />
                  <AccountModalProvider />
                  <main className="min-h-dvh flex-1">
                    <div className="flex h-full flex-col">
                      <SiteHeader />
                      <main className="mb-2 h-full flex-1">{children}</main>
                    </div>
                  </main>
                  <SiteFooter />
                </QueryProvider>
              </div>
            </div>
            <TailwindIndicator />
            <SonnerToaster richColors position="top-center" />
          </ThemeProvider>
          <SpeedInsights />
        </body>
      </html>
    </>
  )
}
