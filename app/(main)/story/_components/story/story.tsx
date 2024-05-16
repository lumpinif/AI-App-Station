import Image from "next/image"

import { PostDetails } from "@/types/db_tables"
import { UserCard } from "@/components/auth/auth-modal/user-card"
import { UserAvatar } from "@/components/auth/avatar/user-avatar"

import { getAuthorProfileById } from "../../_server/data"
import { AuthorCard } from "./story-auth-card"
import { StoryTitle } from "./story-title"

type StoryProps = {
  post: PostDetails
}

export const Story: React.FC<StoryProps> = async ({ post }) => {
  const { authorProfile, getAuthorProfileError } = await getAuthorProfileById(
    post.post_author_id
  )

  if (getAuthorProfileError || !authorProfile) {
    console.error("Error getting author profile:", getAuthorProfileError)
    return <div>Error getting author profile</div>
  }

  return (
    <section className="flex w-full flex-col">
      <div className="mx-auto w-full max-w-4xl space-y-4 rounded-lg border p-2 shadow-sm sm:space-y-6 sm:px-6 sm:py-4 md:space-y-8">
        <StoryTitle post_title={post.post_title} />

        <AuthorCard author={authorProfile} />
        <div className="h-20 border text-center">Author Avatar</div>

        <div className="">Post actions bar</div>

        <div className="">Post content</div>
      </div>
    </section>
  )
}
