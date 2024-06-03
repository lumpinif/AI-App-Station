import { notFound, redirect } from "next/navigation"
import { getUserData } from "@/server/auth"
import { getAllCategories } from "@/server/data/supabase-actions"
import { getPostById } from "@/server/queries/supabase/stories"
import { JSONContent } from "novel"

import StoryContentWrapper from "@/app/(main)/story/_components/story-content/story-content-wrapper"

import { StoryPostEditor } from "./_components/story-post-editor"

type PostEditPageProps = {
  params: { post_id: string }
}

export default async function PostEditPage({ params }: PostEditPageProps) {
  const {
    data: { user },
    error: getUserDataError,
  } = await getUserData()

  if (getUserDataError) {
    console.error(getUserDataError)
    return redirect("/signin")
  }

  if (!user?.id) {
    return redirect("/signin")
  }

  const { post, error: getPostError } = await getPostById(params.post_id)

  if (getPostError) {
    console.error(getPostError)
  }

  const { categories, error: getAllCatError } = await getAllCategories()
  if (getAllCatError) console.error(getAllCatError)

  if (!post) {
    notFound()
  }

  const plainPostContent = JSON.parse(JSON.stringify(post.post_content))

  return (
    <StoryContentWrapper>
      <StoryPostEditor
        {...post}
        allCategories={categories}
        post_content={plainPostContent}
        postCategories={post.categories}
      />
    </StoryContentWrapper>
  )
}
