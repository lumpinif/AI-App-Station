import { notFound, redirect } from "next/navigation"
import { getUserData } from "@/server/auth"
import { getAllCategories } from "@/server/data/supabase-actions"
import { getPostImagesWithUrls } from "@/server/queries/supabase/editor/publish/stories"
import { getPostById } from "@/server/queries/supabase/stories"

import { Posts } from "@/types/db_tables"
import StoryContentWrapper from "@/app/(main)/story/_components/story-content/story-content-wrapper"

import { StoryPostEditor } from "./_components/story-post-editor"

type PostEditPageProps = {
  params: { post_id: string }
}

async function fetchPostImages(
  post_id: Posts["post_id"],
  post_author_id: Posts["post_author_id"]
) {
  try {
    const { postImagesFileNames, postImagesPublicUrls } =
      await getPostImagesWithUrls(post_id, post_author_id)
    return { postImagesFileNames, postImagesPublicUrls }
  } catch (error) {
    console.error("Error fetching post images and URLs:", error)
    // Return some fallback data or handle the error appropriately
    return { postImagesFileNames: [], postImagesPublicUrls: [] } // Or handle it based on your requirements
  }
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

  const { postImagesFileNames, postImagesPublicUrls } = await fetchPostImages(
    post.post_id,
    post.post_author_id
  )

  const plainPostContent = JSON.parse(JSON.stringify(post.post_content))

  return (
    <StoryContentWrapper>
      <StoryPostEditor
        {...post}
        post={post}
        allCategories={categories}
        post_content={plainPostContent}
        postImagesPublicUrls={postImagesPublicUrls}
      />
    </StoryContentWrapper>
  )
}
