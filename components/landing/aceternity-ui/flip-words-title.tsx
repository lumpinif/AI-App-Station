/* eslint-disable tailwindcss/classnames-order */
import React from "react"

import { FlipWords } from "./flip-words"

export function FlipWordsTitle() {
  const words = [
    "best & free",
    "beautiful",
    "powerful",
    "updated",
    "extensive",
    "omniscient",
  ]

  return (
    <div className="mt-10 flex h-80 -translate-y-4 animate-magic-fade-in items-center justify-center [--animation-delay:400ms] sm:mt-0">
      <div className="typing-effect page-title-font inline animate-magic-fade-in text-balance bg-gradient-to-r from-zinc-800 to-gray-300 bg-clip-text py-4 text-5xl !leading-tight text-transparent opacity-0 transition-all duration-500 ease-out [--animation-delay:500ms] dark:from-zinc-300 dark:to-zinc-800 sm:text-6xl">
        <span className="inline animate-magic-fade-in text-balance bg-gradient-to-r from-zinc-500 to-gray-400 bg-clip-text dark:from-zinc-300 dark:to-zinc-700">
          Your
        </span>
        <br className="sm:hidden" />
        <FlipWords
          words={words}
          duration={7000}
          className="mx-4 min-w-fit rounded-3xl transition-all duration-500 ease-out hover:dark:shadow-outline"
        />
        <br className="sm:hidden" />
        place
        <br className="hidden sm:block" /> to know everything
        <br /> about <span className="text-primary">AI .</span>
      </div>
    </div>
  )
}
