import React from "react"

import { Button } from "../ui/button"
import { TextTypingEffectWithTextsFadeOut } from "./TypingEffect"

const HeroSection = () => {
  return (
    <div>
      <div className="my-20 flex h-[100px] select-none items-center justify-center text-center  text-4xl font-extrabold leading-tight tracking-tighter sm:h-[300px] md:text-5xl lg:text-6xl xl:text-7xl">
        <TextTypingEffectWithTextsFadeOut />
      </div>

      <div className="mt-10 flex min-w-[350px] flex-col items-center justify-center gap-10 text-center text-xl drop-shadow-sm md:text-3xl lg:min-w-full lg:text-4xl">
        <div className="font-semibold">
          Probably the only AI App Store you&apos;ll ever need.
        </div>{" "}
        <div className="text-base text-muted-foreground sm:text-lg md:text-xl">
          Stay ahead of the curve with cutting-edge solutions in the age of AI
          with Today&apos;s news, the newest AI Apps with collections,
          categories, and stories completely for{" "}
          <span className="font-bold uppercase text-foreground">free</span>.
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center">
        <div className="flex space-x-4">
          <Button>Get Started</Button>
          <Button variant={"ghost"}>Learn More</Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
