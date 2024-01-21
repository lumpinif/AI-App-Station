import { ThemeProvider } from "@/provider/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@/styles/globals.css"
import { Suspense } from "react"
import { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import AuthModal from "@/components/auth/avatar/auth-modal"
import { TailwindIndicator } from "@/components/theme/tailwind-indicator"

import { getUserSession } from "./(auth)/auth-actions"

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
  const {
    data: { session },
  } = await getUserSession()

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
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
                <Suspense>
                  <AuthModal session={session} />
                </Suspense>
                <main className="flex-1">{children}</main>
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
