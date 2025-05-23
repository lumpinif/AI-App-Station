import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ReportDialog } from "@/components/feedback-report/report-dialog"
import { ThemeToggle } from "@/components/theme/theme-toggle"

import { SiteLogo } from "../site-header/site-header"
import { EmailSubscribeForm } from "./email-subscribe-form"

const footerLinks: { id: number; title: string; url: string }[][] = [
  [
    { id: 1, title: "Twitter", url: siteConfig.links.twitter },
    { id: 2, title: "Github", url: siteConfig.links.github },
    { id: 3, title: "Submit apps", url: "/submit" },
    { id: 4, title: "Write stories", url: "/story/new" },
    // { id: 4, title: "Story", url: "#" },
  ],
  [
    { id: 5, title: "AI Apps", url: "/ai-apps" },
    { id: 6, title: "Stories", url: "/stories" },
    { id: 7, title: "Profile", url: "/user" },
    { id: 8, title: "For You", url: "/foryou" },

    // { id: 8, title: "More", url: "#" },
  ],
]

export function SiteFooter() {
  return (
    <footer className="my-20 mt-40">
      <Separator className="container mx-auto bg-input" />
      <section className="container py-16">
        <div className="mx-auto flex h-full flex-col gap-x-5 gap-y-10 md:items-start md:justify-between lg:flex-row lg:px-10 xl:px-0">
          <div className="flex h-full w-full flex-col items-start justify-between gap-y-6 md:w-1/2 lg:w-1/3">
            <div className="flex h-full flex-col items-start justify-between gap-y-2">
              <SiteLogo
                className="w-full sm:w-full"
                linkCN="page-title-font inline animate-magic-fade-in text-balance bg-gradient-to-r hover:from-primary hover:to-primary hover:via-primary from-primary/75 via-primary to-primary/75 bg-clip-text !leading-tight text-transparent opacity-0 transition-all duration-500 ease-out [--animation-delay:500ms] dark:from-zinc-300 dark:via-zinc-400 dark:to-zinc-300 text-sm dark:from-10% dark:via-40% dark:to-100% hover:dark:from-zinc-300 hover:dark:via-zinc-300 hover:dark:to-zinc-300 text-xl"
              />

              <p className="text-muted-foreground">Best place to find an AI.</p>
            </div>

            <div className="flex w-full items-center justify-between gap-x-4 sm:justify-normal">
              <ThemeToggle />

              <div className="flex">
                <ReportDialog
                  reportType="feedback"
                  dialogTriggerProps={{ asChild: true }}
                >
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    className="glass-card-background flex items-center justify-center rounded-full text-sm text-muted-foreground shadow-top"
                  >
                    Send us feedback
                  </Button>
                </ReportDialog>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start gap-x-10">
            {footerLinks.map((column, columnIndex) => (
              <ul key={columnIndex} className="flex flex-col gap-y-2">
                {column.map((link) => (
                  <li
                    key={link.id}
                    className="text-[15px]/normal font-normal text-muted-foreground transition-all duration-100 ease-linear hover:text-primary hover:underline hover:underline-offset-4 dark:font-medium"
                  >
                    <a href={link.url}>{link.title}</a>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <EmailSubscribeForm />
          </div>
        </div>
      </section>
      <Separator className="container mx-auto mb-20 bg-input" />
    </footer>
  )
}
