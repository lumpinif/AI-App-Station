import Image from "next/image"
import { notFound } from "next/navigation"
import { getPost } from "@/server/data"
import supabase from "@/utils/supabase/supabase"

import { Posts } from "@/types/db_tables"
import { nameToSlug } from "@/lib/utils"

export const dynamicParams = false

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  let { data: allPosts, error } = await supabase
    .from("posts")
    .select("*")
    .returns<Posts[]>()

  if (error) {
    throw new Error(error.message)
  }

  if (!allPosts) {
    return []
  }

  if (allPosts) {
    const storyParams = allPosts.map((post) => ({
      slug: post.post_slug,
    }))
    return storyParams
  }
  return []
}

export default async function StoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const post_slug = nameToSlug(params.slug)

  const { post, error } = await getPost(post_slug)

  if (!post) {
    notFound()
  }

  if (error) {
    console.error(error)
  }

  //TODO: Check and get user session

  return (
    <>
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
      <>
        <section className="flex w-full flex-col p-2 sm:p-4">
          <div className="grid w-full gap-4 lg:grid-cols-2 ">
            {/* Left Image Area */}
            <div className="relative hidden w-full border lg:col-span-1 lg:flex lg:items-center lg:justify-center">
              <div className="top-1/2 w-1/5 -translate-y-1/2 lg:fixed">
                <Image
                  alt=""
                  src={"/images/tool-preview.png"}
                  height={600}
                  width={600}
                  className="rounded-xl object-cover"
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full  p-2 px-4 lg:col-span-1">
              <Image
                alt=""
                src={"/images/tool-preview.png"}
                height={600}
                width={600}
                className="aspect-square w-full rounded-xl object-cover lg:hidden"
              />
              <h3 className="text-xl font-medium">{post.post_title}</h3>
              <p className="text-muted-foreground text-sm">
                Created by {post.profiles?.full_name || post.profiles?.email}
              </p>
              <p>
                {post.post_content}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
                aliquam, iure eum, exercitationem possimus hic perspiciatis
                earum architecto, veritatis iste dolores aspernatur. Neque
                distinctio temporibus quod cupiditate corporis sequi quos. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Distinctio
                enim, quas veniam omnis corrupti rerum beatae suscipit quod
                quisquam, temporibus esse labore, sapiente eaque eveniet porro
                explicabo unde dolorem deserunt!
              </p>

              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
                aliquam, iure eum, exercitationem possimus hic perspiciatis
                earum architecto, veritatis iste dolores aspernatur. Neque
                distinctio temporibus quod cupiditate corporis sequi quos. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Distinctio
                enim, quas veniam omnis corrupti rerum beatae suscipit quod
                quisquam, temporibus esse labore, sapiente eaque eveniet porro
                explicabo unde dolorem deserunt!
              </p>
            </div>
          </div>
        </section>
      </>
    </>
  )
}
