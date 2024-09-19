import Link from "next/link"

import { Button } from "@/components/ui/button"

const GetStartButton = () => {
  return (
    <Button
      asChild
      size={"label"}
      variant={"default"}
      className="mx-auto flex -translate-y-4 animate-magic-fade-in gap-1 rounded-lg bg-primary px-4 text-base tracking-tight opacity-0 shadow-outline transition-all duration-300 ease-in-out [--animation-delay:600ms] hover:shadow-inner-outline dark:border-0"
    >
      <Link href={"/ai-apps"} className="w-fit">
        <span>Get Started</span>
      </Link>
    </Button>
  )
}

export default GetStartButton
