/* eslint-disable tailwindcss/classnames-order */
"use client"

import { FlipWordsTitle } from "../aceternity-ui/flip-words-title"
import GetStartButton from "../hero/get-start-button"
import HeroDescription from "../hero/hero-description"
import HeroImage from "../hero/hero-image"
import IntroducingBadge from "../hero/introducing-badge"
import SignInButtons from "../hero/signin-button"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="container relative mx-auto mt-20 max-w-7xl px-6 text-center sm:mt-32 md:mt-40"
    >
      <IntroducingBadge />
      <FlipWordsTitle />
      <HeroDescription />
      <span className="mt-44 flex flex-col gap-y-4">
        <GetStartButton />
        <p className="animate-magic-fade-in text-balance text-base font-light tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms]">
          Free and Easy to use with your managable accounts and collections.
        </p>
        <span className="mt-5 flex items-center justify-center gap-x-4">
          <SignInButtons />
        </span>
      </span>

      <HeroImage />
    </section>
  )
}
