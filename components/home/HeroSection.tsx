import Link from "next/link"

import { Button } from "../ui/button"
import { TextTypingEffectWithTextsFadeOut } from "./TypingEffect"

const HeroSection = () => {
  return (
    <>
      <div className="relative my-16 flex h-[100px] select-none items-center justify-center text-center text-4xl font-extrabold leading-tight tracking-tighter sm:h-[300px] md:text-5xl lg:text-6xl xl:text-7xl">
        <Link
          href="/today"
          className="ease absolute top-[-10px] mx-auto hidden justify-center rounded-full px-10 py-2 text-center font-medium leading-none tracking-normal text-muted-foreground transition-all duration-300 hover:scale-105 hover:shadow-inner-outline md:flex md:text-2xl "
        >
          OpenmindAI Apps and News Station
        </Link>
        <TextTypingEffectWithTextsFadeOut />
      </div>

      <div className=" flex min-w-[350px] flex-col items-center justify-center gap-14 text-center text-xl drop-shadow-sm lg:min-w-full ">
        <div className="font-semibold md:text-2xl lg:text-3xl xl:text-4xl">
          Probably the last AI Apps & News Station you&apos;ll ever need.
        </div>{" "}
        <div className="text-base text-muted-foreground sm:text-lg md:text-xl">
          Stay ahead of the curve with cutting-edge solutions in the age of AI
          with Today&apos;s news, the newest AI Apps with collections,
          categories, and stories completely for{" "}
          <span className="font-bold uppercase text-foreground">free</span>.
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <Link href="/today">
              <Button className="hover:shadow-inner-outline">
                Get Started
              </Button>
            </Link>
            <Button variant={"outline"} className="hover:shadow-inner-outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection
