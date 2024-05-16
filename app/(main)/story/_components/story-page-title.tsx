"use client"

import { usePathname } from "next/navigation"

import { PageTitle } from "@/components/layout/page-title"

import { StoryPostButton } from "./story/story-post-button"

const StoryPageTitle = () => {
  const currentPath = usePathname()
  const pageTitle =
    currentPath === "/story"
      ? "Story"
      : currentPath === "/story/post"
        ? "Post a story"
        : "Story"

  const pageHref = currentPath === "/story" ? "/story" : "#"

  return (
    <PageTitle title={pageTitle} href={pageHref}>
      <StoryPostButton />
    </PageTitle>
  )
}

export default StoryPageTitle
