/* eslint-disable tailwindcss/classnames-order */
"use client"

import { User } from "@supabase/supabase-js"

import { cn } from "@/lib/utils"
import SignOutButton from "@/components/auth/signout/sign-out-button"

import { FlipWordsTitle } from "../aceternity-ui/flip-words-title"
import GetStartButton from "../hero/get-start-button"
import HeroDescription from "../hero/hero-description"
import IntroducingBadge from "../hero/introducing-badge"
import LogInButtons from "../hero/signin-button"

export default function HeroSection({
  user,
  className,
}: {
  user: User | null
  className?: string
}) {
  return (
    <section
      id="hero"
      className={cn(
        "container relative mx-auto mt-8 max-w-7xl px-6 text-center sm:mt-32 md:mt-36",
        className
      )}
    >
      <IntroducingBadge />
      <FlipWordsTitle />
      <HeroDescription />
      <span className="flex flex-col gap-y-4 sm:mt-32 md:mt-36">
        <GetStartButton />
        <p className="animate-magic-fade-in text-balance text-base font-light tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms]">
          Free and Easy to use with your accounts.
          <br />
          Like App Store but with more AIs.
        </p>
        <span className="mt-10 flex items-center justify-center gap-x-4">
          {user?.id ? null : <LogInButtons />}
        </span>
      </span>
    </section>
  )
}
