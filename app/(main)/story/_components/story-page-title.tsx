"use client"

import { usePathname } from "next/navigation"

import { PageTitle } from "@/components/layout/page-title"

import { WriteNewStoryButton } from "./write-new-story-button"

const StoryPageTitle = () => {
  const currentPath = usePathname()
  const isNewStoryPath = currentPath === "/story/new"

  const pageTitle =
    currentPath === "/story"
      ? "Story"
      : currentPath === "/story/new"
        ? "Write a story"
        : "Story"

  const pageHref = currentPath === "/story" ? "/story" : "#"

  if (isNewStoryPath) {
    return null
  }

  return (
    <PageTitle withBackButton title={""} href={pageHref} withBorder={false}>
      <WriteNewStoryButton
        variant={"ghost"}
        size={"label"}
        spinnerButtonCN="w-32 rounded-full border dark:border-0 dark:shadow-outline"
      />
    </PageTitle>
  )
}

export default StoryPageTitle
