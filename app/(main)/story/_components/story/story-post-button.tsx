"use client"

import { usePathname } from "next/navigation"
import { User } from "@supabase/supabase-js"

import { NewStoryButton } from "./new-story-button"

type StoryPostButtonProps = { user: User | null | undefined }

export const StoryPostButton: React.FC<StoryPostButtonProps> = ({ user }) => {
  const currentPath = usePathname()
  if (currentPath === "/story/new") return null

  return <NewStoryButton user={user} />
}
