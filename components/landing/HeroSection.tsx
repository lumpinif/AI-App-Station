import Link from "next/link"

import { Button } from "../ui/button"
import { TextTypingEffectWithTextsFadeOut } from "./TypingEffect"

const HeroSection = () => {
  return (
    <div className="h-dvh">
      <div className="container relative my-auto flex h-5/6 w-full flex-col items-center gap-14 sm:justify-center sm:gap-20">
        {/* <HeroLogo /> */}
        <TypingEffect />
        <Banner />
        <LandingActions />
      </div>
    </div>
  )
}

export default HeroSection

function LandingActions() {
  return (
    <div className="flex w-full min-w-[350px] items-center justify-center gap-4 text-center text-xl drop-shadow-sm">
      <Link href="/today">
        <Button className="w-28">Get Started</Button>
      </Link>
      <span className="text-muted-foreground flex text-xs sm:text-sm">or</span>
      <Link href="/signin" className="sm:flex">
        <Button className="w-28" variant={"outline"}>
          Sign In
        </Button>
      </Link>
    </div>
  )
}

function Banner() {
  return (
    <div className="flex w-full min-w-[350px] flex-col items-center justify-center text-center text-xl drop-shadow-sm">
      <div className="max-w-md font-semibold sm:max-w-fit md:text-2xl lg:text-3xl xl:text-4xl">
        Probably the last AI Apps & News Station you&apos;ll ever need.
      </div>{" "}
      <div className="text-muted-foreground max-w-md  text-xs sm:max-w-xl sm:text-lg md:max-w-2xl md:text-xl lg:max-w-4xl">
        Stay ahead of the curve with cutting-edge solutions in the age of AI
        with Today&apos;s news, the newest AI Apps with collections, categories,
        and stories completely for{" "}
        <span className="text-foreground font-bold uppercase">free</span>.
      </div>
    </div>
  )
}

function TypingEffect() {
  return (
    <>
      <div className="relative flex h-1/3 w-full select-none items-center justify-center text-center text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl xl:text-7xl">
        <TextTypingEffectWithTextsFadeOut />
      </div>
    </>
  )
}
function HeroLogo() {
  return (
    <Link
      href="/today"
      className="text-muted-foreground absolute text-center text-sm font-medium leading-none tracking-normal transition-all hover:scale-105 sm:text-lg"
    >
      AI App Station <span> by OpenmindAI</span>
    </Link>
  )
}
