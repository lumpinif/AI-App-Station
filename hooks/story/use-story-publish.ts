import { useRouter } from "next/navigation"
import {
  checkExistingCategories,
  insertCategories,
} from "@/server/queries/supabase/categories"
import {
  archiveDailyPost,
  checkExistingTopics,
  createNewDailyPost,
  getAllTopics,
  insertPostCategories,
  insertPostTopics,
  insertTopics,
  removePostCategories,
  removePostTopics,
  unarchiveDailyPost,
  updatePostDescription,
  updatePostImageSrc,
} from "@/server/queries/supabase/editor/publish/stories"
import { publishStory } from "@/server/queries/supabase/stories/table/post-table-services"
import _ from "lodash"
import { toast } from "sonner"

import {
  Categories,
  Daily_post,
  Posts,
  Profiles,
  Topics,
} from "@/types/db_tables"
import {
  checkIsSuperUser,
  getPostAuthorSlug,
  isPostgrestError,
  nameToSlug,
} from "@/lib/utils"
import { Option } from "@/components/ui/multiple-selector"
import { dynamicLucidIconProps } from "@/components/icons/lucide-icon"

type TopicsMutiSelectorProps = {
  topics?: Topics[]
  daily_post?: Daily_post
  postCategories?: Categories[]
  allCategories?: Categories[] | null
  defaultDescription?: Posts["post_description"]
  setPublishButtonState?: React.Dispatch<
    React.SetStateAction<"idle" | "loading" | "success">
  >
  setSaveButtonState?: React.Dispatch<
    React.SetStateAction<"idle" | "loading" | "success">
  >
  defaultImageSrc?: Posts["post_image_src"]
}

type PublishOrSaveValues = {
  post_id: Posts["post_id"]
  post_image_src: Posts["post_image_src"]
  post_description: Posts["post_description"]
  is_daily_post_checked?: boolean
  topics?: Option[]
  profile?: Profiles
  postCategories?: Option[]
}

export const searchAllTopics = async (value: string): Promise<Option[]> => {
  const { topics, error } = await getAllTopics()

  if (error) {
    toast.error(error)
    return []
  }

  const allTopics: Option[] =
    topics?.map((topic) => ({
      label: topic.topic_name,
      value: topic.topic_slug,
      id: topic.topic_id,
    })) || []

  const res = allTopics.filter((option) =>
    option.value.includes(nameToSlug(value))
  )

  return res
}

export const useStorySaveAndPublish = ({
  topics,
  daily_post,
  allCategories,
  postCategories,
  defaultImageSrc,
  defaultDescription,
  setSaveButtonState,
  setPublishButtonState,
}: TopicsMutiSelectorProps) => {
  const router = useRouter()

  const defaultTopics: Option[] =
    topics?.map((topic) => ({
      label: topic.topic_name,
      value: topic.topic_slug,
      id: topic.topic_id,
    })) || []

  const defaultPostCategories: Option[] =
    postCategories?.map((category) => ({
      label: category.category_name,
      value: category.category_slug,
      id: category.category_id,
      icon: category.category_icon_name as dynamicLucidIconProps,
    })) || []

  const defaultPostCategoriesWithoutIcon: Option[] =
    postCategories?.map((category) => ({
      label: category.category_name,
      value: category.category_slug,
      id: category.category_id,
    })) || []

  const allCategoriesOptions: Option[] =
    allCategories?.map((category) => ({
      label: category.category_name,
      value: category.category_slug,
      id: category.category_id,
      icon: category.category_icon_name as dynamicLucidIconProps,
    })) || []

  const defaultIsDailyPostChecked =
    daily_post?.dpost_id !== undefined && daily_post.is_archived === false

  const handleUpdateTopics = async (
    topics: Option[],
    post_id: Posts["post_id"]
  ) => {
    const normalizedTopics = topics.map((t) => ({
      ...t,
      value: nameToSlug(t.label),
    }))

    const submittedTopicslugs = new Set(normalizedTopics.map((t) => t.value))
    const initialTopicsMap = new Map(defaultTopics.map((t) => [t.value, t]))

    const topicsToAdd = normalizedTopics.filter(
      (d) => !initialTopicsMap.has(d.value)
    )
    const topicsToRemove = defaultTopics.filter(
      (d) => !submittedTopicslugs.has(d.value)
    )

    if (topicsToAdd.length === 0 && topicsToRemove.length === 0) {
      return
    }

    try {
      const existingTopics = await checkExistingTopics(topicsToAdd)

      const newTopics = topicsToAdd.filter(
        (t) =>
          !existingTopics.some(
            (existingTopic) => existingTopic.topic_slug === t.value
          )
      )

      const insertedTopics =
        newTopics.length > 0 ? await insertTopics(newTopics) : []

      const newStoryTopicIds = [
        ...insertedTopics.map((top) => top.topic_id),
        ...existingTopics
          .filter(
            (top) =>
              !defaultTopics.some((t) => t.id === top.topic_id.toString())
          )
          .map((top) => top.topic_id),
      ]

      if (newStoryTopicIds.length > 0) {
        await insertPostTopics(post_id, newStoryTopicIds)
      }

      if (topicsToRemove.length > 0) {
        const topicIdsToRemove = topicsToRemove.map((d) => d.id as string)

        await removePostTopics(post_id, topicIdsToRemove)
      }

      // toast.success("Topics updated")
    } catch (error) {
      console.error("Error updating topics:", error)
      toast.error("Failed updating topics, please try again")
    }
  }

  const handleUpdatePostCategories = async (
    categories: Option[],
    post_id: Posts["post_id"]
  ) => {
    const normalizedCategories = categories.map((c) => ({
      ...c,
      value: nameToSlug(c.label),
    }))

    const submittedCategorySlugs = new Set(
      normalizedCategories.map((c) => c.value)
    )

    const initialCategoriessMap = new Map(
      defaultPostCategories.map((c) => [c.value, c])
    )

    const categoriesToAdd = normalizedCategories.filter(
      (d) => !initialCategoriessMap.has(d.value)
    )

    const categoriesToRemove = defaultPostCategories.filter(
      (d) => !submittedCategorySlugs.has(d.value)
    )

    if (categoriesToAdd.length === 0 && categoriesToRemove.length === 0) {
      return
    }

    try {
      const existingCategories = await checkExistingCategories(categoriesToAdd)

      const newCategories = categoriesToAdd.filter(
        (c) =>
          !existingCategories.some(
            (existingCat) => existingCat.category_slug === c.value
          )
      )

      const insertedCategories =
        newCategories.length > 0 ? await insertCategories(newCategories) : []

      const newAppCategoryIds = [
        ...insertedCategories.map((cat) => cat.category_id),
        ...existingCategories
          .filter(
            (cat) =>
              !defaultPostCategories.some(
                (d) => d.id === cat.category_id.toString()
              )
          )
          .map((cat) => cat.category_id),
      ]

      if (newAppCategoryIds.length > 0) {
        await insertPostCategories(post_id, newAppCategoryIds)
      }

      if (categoriesToRemove.length > 0) {
        const categoryIdsToRemove = categoriesToRemove.map(
          (c) => c.id as string
        )

        await removePostCategories(post_id, categoryIdsToRemove)
      }

      // toast.success("Categories updated")
    } catch (error) {
      console.error("Error updating story categories:", error)
      toast.error("Failed updating story categories, please try again")
    }
  }

  const handlePublishOrSave = async (
    saveOrPublish: "save" | "publish",
    {
      post_id,
      post_image_src,
      post_description,
      is_daily_post_checked,
      topics,
      profile,
      postCategories,
    }: PublishOrSaveValues
  ) => {
    const isSaving = saveOrPublish === "save"
    const isPublishing = saveOrPublish === "publish"

    const author_slug = getPostAuthorSlug(profile)
    const isSuperUser = checkIsSuperUser(profile?.profile_role?.role)

    const isDailyPost = daily_post?.dpost_id !== undefined
    const isDailyPostArchived = !!daily_post?.is_archived

    const promises = []
    let changesMade = false

    if (isPublishing && setPublishButtonState) {
      setPublishButtonState("loading")
    } else if (isSaving && setSaveButtonState) {
      setSaveButtonState("loading")
    }

    if (post_description !== defaultDescription) {
      changesMade = true
      if (setPublishButtonState) {
        setPublishButtonState("loading")
      }
      promises.push(updatePostDescription(post_id, post_description))
    }

    if (
      topics &&
      topics !== defaultTopics &&
      _.isEqual(topics, defaultTopics) === false
    ) {
      changesMade = true
      if (setPublishButtonState) {
        setPublishButtonState("loading")
      }
      promises.push(handleUpdateTopics(topics, post_id))
    }

    if (
      postCategories &&
      postCategories !== defaultPostCategoriesWithoutIcon &&
      _.isEqual(postCategories, defaultPostCategoriesWithoutIcon) === false
    ) {
      changesMade = true
      if (setPublishButtonState) {
        setPublishButtonState("loading")
      }
      promises.push(handleUpdatePostCategories(postCategories, post_id))
    }

    if (
      post_image_src !== defaultImageSrc &&
      _.isEqual(post_image_src, defaultImageSrc) === false
    ) {
      changesMade = true
      if (setPublishButtonState) {
        setPublishButtonState("loading")
      }
      promises.push(updatePostImageSrc(post_id, post_image_src))
    }

    // handle daily post changes
    if (isSuperUser && is_daily_post_checked !== defaultIsDailyPostChecked) {
      // Flag indicating changes made
      changesMade = true

      // Set publish button state to loading if the function is provided
      if (isPublishing && setPublishButtonState) {
        setPublishButtonState("loading")
      } else if (isSaving && setSaveButtonState) {
        setSaveButtonState("loading")
      }

      // Check if the daily post is checked by default
      if (defaultIsDailyPostChecked) {
        // Archive daily post if it's a daily post and not archived
        if (isDailyPost && !isDailyPostArchived) {
          promises.push(archiveDailyPost(daily_post.dpost_id))
        }
      } else {
        // When daily post is not checked by default, handle the unarchiving or creating new daily post

        // Unarchive daily post if it is a daily post and currently archived
        if (isDailyPost && isDailyPostArchived) {
          promises.push(unarchiveDailyPost(daily_post.dpost_id))
        }

        // Create a new daily post if the checkbox is checked and it's not currently a daily post
        if (is_daily_post_checked && !isDailyPost) {
          promises.push(createNewDailyPost(post_id))
        }
      }
    }

    if (promises.length > 0) {
      try {
        await Promise.all(promises)

        // if publishing
        if (isPublishing) {
          const { error: publishStoryError } = await publishStory(post_id)
          if (publishStoryError) {
            let errorDescription = ""

            if (typeof publishStoryError === "string") {
              errorDescription = publishStoryError
            } else if (isPostgrestError(publishStoryError)) {
              errorDescription = publishStoryError.message
            }

            toast.error("Failed to publish story, please try again later.", {
              description: errorDescription,
            })
          }
          router.push(`/story/${author_slug}/${post_id}`)
        } else if (isSaving) {
          router.push(`/user/stories`)
        }

        if (isPublishing && setPublishButtonState) {
          setPublishButtonState("success")
          toast.success("Story published successfully")
        } else if (isSaving && setSaveButtonState) {
          setSaveButtonState("success")
          toast.success("Story saved successfully")
        }
      } catch (error) {
        let errorMessage = ""

        if (typeof error === "string") {
          errorMessage = error
        } else if (isPostgrestError(error)) {
          errorMessage = error.message
        }

        toast.error(
          `Something went wrong while ${isPublishing ? "publishing" : isSaving ? "saving" : "handling"} this story.`,
          {
            description: errorMessage,
          }
        )

        if (isPublishing && setPublishButtonState) {
          setPublishButtonState("idle")
        } else if (isSaving && setSaveButtonState) {
          setSaveButtonState("idle")
        }
      } finally {
        if (isPublishing && setPublishButtonState) {
          setTimeout(() => {
            setPublishButtonState("idle")
          }, 2000)
        } else if (isSaving && setSaveButtonState) {
          setTimeout(() => {
            setSaveButtonState("idle")
          }, 2000)
        }
      }
    }

    if (!changesMade) {
      if (isPublishing && setPublishButtonState) {
        setPublishButtonState("idle")
        router.push(`/story/${author_slug}/${post_id}`)
      } else if (isSaving && setSaveButtonState) {
        setSaveButtonState("idle")
        router.push(`/user/stories`)
      }
    }
  }

  // TODO: CONSIDER COMBINE TWO HANDLE FUNCTIONS INTO ONE

  return {
    defaultTopics,
    handlePublishOrSave,
    allCategoriesOptions,
    defaultPostCategories,
    defaultIsDailyPostChecked,
  }
}
