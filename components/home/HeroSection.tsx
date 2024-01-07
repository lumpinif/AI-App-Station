import Link from "next/link"

import { Button } from "../ui/button"
import { TextTypingEffectWithTextsFadeOut } from "./TypingEffect"

const HeroSection = () => {
  return (
    <>
      <div className="relative mt-16 flex h-[150px] select-none items-center justify-center text-center text-4xl font-extrabold leading-tight tracking-tighter sm:h-[200px] md:h-[300px] md:text-5xl lg:text-6xl xl:text-7xl">
        <Link
          href="/today"
          className="ease absolute top-[-30px] mx-auto justify-center rounded-full px-10 py-2 text-center text-base font-medium leading-none tracking-normal text-muted-foreground transition-all duration-300 hover:scale-105 sm:top-3 sm:text-lg md:text-xl"
        >
          <span className="hidden sm:inline-block lg:hidden">Openmind</span>AI
          Apps and News
        </Link>
        <TextTypingEffectWithTextsFadeOut />
      </div>

      <div className="mt-4 flex min-w-[350px] flex-col items-center justify-center gap-4 text-center text-xl drop-shadow-sm sm:mt-16 lg:min-w-full">
        <div className="max-w-md font-semibold sm:max-w-fit md:text-2xl lg:text-3xl xl:text-4xl">
          Probably the last AI Apps & News Station you&apos;ll ever need.
        </div>{" "}
        <div className="max-w-md text-xs  text-muted-foreground sm:max-w-xl sm:text-lg md:max-w-2xl md:text-xl lg:max-w-4xl">
          Stay ahead of the curve with cutting-edge solutions in the age of AI
          with Today&apos;s news, the newest AI Apps with collections,
          categories, and stories completely for{" "}
          <span className="font-bold uppercase text-foreground">free</span>.
        </div>
      </div>

      <div className="mt-3 flex min-w-[350px] items-center justify-center gap-4 text-center text-xl drop-shadow-sm sm:mt-20 lg:min-w-full">
        <Link href="/today">
          <Button className="w-28 hover:shadow-inner-outline">
            Get Started
          </Button>
        </Link>
        <span className="flex text-xs text-muted-foreground sm:text-sm">
          or
        </span>
        <Link href="/signin" className="sm:flex">
          <Button
            className="w-28 hover:shadow-inner-outline"
            variant={"outline"}
          >
            Sign In
          </Button>
        </Link>
      </div>
    </>
  )
}

export default HeroSection
