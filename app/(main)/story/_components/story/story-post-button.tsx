"use client"

import Link from "next/link"
import { SquarePen } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type StoryPostButtonProps = {}

export const StoryPostButton: React.FC<StoryPostButtonProps> = ({}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link href="/story/post" className="flex items-center gap-2">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="text-muted-foreground text-sm tracking-[-.016em] md:tracking-[-.024em]"
            >
              <SquarePen className="size-4" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="end"
          sideOffset={10}
          className="dark:bg-foreground dark:text-background flex items-center gap-2"
        >
          <span>Write a new story</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
