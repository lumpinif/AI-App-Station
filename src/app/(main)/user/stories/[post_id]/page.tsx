import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getUser } from "@/server/auth"
import { getAllCategories } from "@/server/queries/supabase/categories"
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
  post_slug: Posts["post_slug"],
  post_author_id: Posts["post_author_id"]
) {
  try {
    const { postImagesFileNames, postImagesPublicUrls } =
      await getPostImagesWithUrls(post_id, post_slug, post_author_id)
    return { postImagesFileNames, postImagesPublicUrls }
  } catch (error) {
    console.error("Error fetching post images and URLs:", error)
    // Return some fallback data or handle the error appropriately
    return { postImagesFileNames: [], postImagesPublicUrls: [] } // Or handle it based on your requirements
  }
}

async function fetchPostById(post_id: Posts["post_id"]) {
  const { post, error: getPostError } = await getPostById(post_id)

  return { post, getPostError }
}

export async function generateMetadata({
  params,
}: PostEditPageProps): Promise<Metadata> {
  const { post } = await fetchPostById(params.post_id)

  if (!post) {
    return {}
  }

  const post_title = post?.post_title

  return {
    title: `Editing - ${post_title}`,
    description: `In the editor mode for ${post_title}`,
  }
}

export default async function PostEditPage({ params }: PostEditPageProps) {
  const { user, error: getUserDataError } = await getUser()

  if (getUserDataError) {
    console.error(getUserDataError)
    return redirect("/signin")
  }

  if (!user?.id) {
    return redirect("/signin")
  }

  const { post, getPostError } = await fetchPostById(params.post_id)

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
    post.post_slug,
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
