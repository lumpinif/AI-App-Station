"use client"

import { useState } from "react"

import { Separator } from "@/components/ui/separator"
import { InputBorderSpotlight } from "@/components/shared/InputBorderSpotlight"
import { SpinnerButton } from "@/components/shared/spinner-button"
import { ThemeToggle } from "@/components/theme/theme-toggle"

import { SiteLogo } from "../site-header/site-header"

const footerLinks: { id: number; title: string; url: string }[][] = [
  [
    { id: 1, title: "About", url: "#" },
    { id: 2, title: "Contact", url: "#" },
    { id: 3, title: "Blog", url: "#" },
    { id: 4, title: "Story", url: "#" },
  ],
  [
    { id: 5, title: "Company", url: "#" },
    { id: 6, title: "Product", url: "#" },
    { id: 7, title: "Press", url: "#" },
    { id: 8, title: "More", url: "#" },
  ],
]

// TODO:IMPLEMENT THE EMAIL SUBSCRIBE BEFORE PRODUCTION

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [subButtonState, setSubButtonState] = useState<
    "idle" | "loading" | "success"
  >("idle")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubButtonState("loading")
    setEmail("")
    setIsSubscribed(true)
    // Reset the subscribed status after 2 seconds
    setTimeout(() => {
      setSubButtonState("success")
      setIsSubscribed(false)
    }, 2000)

    setTimeout(() => {
      setSubButtonState("idle")
      setIsSubscribed(false)
    }, 4000)
  }

  return (
    <footer className="my-20 mt-40">
      <Separator className="container mx-auto bg-input" />
      <section className="container py-16">
        <div className="mx-auto flex flex-col gap-x-5 gap-y-10 md:items-start md:justify-between lg:flex-row lg:px-10 xl:px-0">
          <div className="flex w-full items-start justify-between gap-y-2 sm:flex-col sm:gap-y-6 md:w-1/2 lg:w-1/3">
            <div className="flex flex-col items-start justify-start gap-y-2">
              <SiteLogo
                className="w-full sm:w-full"
                linkCN="page-title-font inline animate-magic-fade-in text-balance bg-gradient-to-r hover:from-primary hover:to-primary hover:via-primary from-primary/75 via-primary to-primary/75 bg-clip-text !leading-tight text-transparent opacity-0 transition-all duration-500 ease-out [--animation-delay:500ms] dark:from-zinc-300 dark:via-zinc-400 dark:to-zinc-300 text-sm dark:from-10% dark:via-40% dark:to-100% hover:dark:from-zinc-300 hover:dark:via-zinc-300 hover:dark:to-zinc-300 text-xl"
              />

              <p className="text-muted-foreground">Best place to find an AI.</p>
            </div>

            <div>
              <ThemeToggle />
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
            <div className="flex flex-col gap-y-2">
              {/* <p className="text-lg font-bold">Contact us</p> */}

              <div className="flex items-center gap-x-4">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-x-4"
                >
                  <InputBorderSpotlight
                    type="email"
                    placeholder="beff@jezos.ai"
                    className="dark:placeholder:text-muted"
                  />

                  <SpinnerButton
                    type="submit"
                    withSuccess
                    buttonState={subButtonState}
                    successElement={"Subscribed"}
                    className="w-36 font-medium"
                  >
                    Subscribe
                  </SpinnerButton>
                </form>
              </div>

              <p className="max-w-sm text-xs text-muted-foreground dark:text-muted">
                By submitting your email address, you agree to receive AI App
                Station’s newsletters. For more information, please read our
                privacy policy. You can always withdraw your consent.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Separator className="container mx-auto mb-20 bg-input" />
    </footer>
  )
}
