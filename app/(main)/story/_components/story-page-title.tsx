"use client"

import { usePathname } from "next/navigation"

import { useUserData } from "@/hooks/react-hooks/use-user"
import { PageTitle } from "@/components/layout/page-title"

import { StoryPostButton } from "./story/story-post-button"

const StoryPageTitle = () => {
  const currentPath = usePathname()

  const { data: user } = useUserData()

  const pageTitle =
    currentPath === "/story"
      ? "Story"
      : currentPath === "/story/post"
        ? "Post a story"
        : "Story"

  const pageHref = currentPath === "/story" ? "/story" : "#"

  return (
    <PageTitle title={pageTitle} href={pageHref}>
      <StoryPostButton user={user} />
    </PageTitle>
  )
}

export default StoryPageTitle
