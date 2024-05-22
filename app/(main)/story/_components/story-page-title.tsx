"use client"

import { usePathname } from "next/navigation"

import { PageTitle } from "@/components/layout/page-title"

import { WriteNewStoryButton } from "./story/write-new-story-button"

const StoryPageTitle = () => {
  const currentPath = usePathname()

  const pageTitle =
    currentPath === "/story"
      ? "Story"
      : currentPath === "/story/new"
        ? "Write a story"
        : "Story"

  const pageHref = currentPath === "/story" ? "/story" : "#"

  return (
    <PageTitle title={pageTitle} href={pageHref}>
      <WriteNewStoryButton />
    </PageTitle>
  )
}

export default StoryPageTitle
