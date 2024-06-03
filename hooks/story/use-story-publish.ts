import { useRouter } from "next/navigation"
import {
  checkExistingCategories,
  insertCategories,
} from "@/server/data/supabase-actions"
import {
  checkExistingTopics,
  getAllTopics,
  insertPostCategories,
  insertPostTopics,
  insertTopics,
  removePostCategories,
  removePostTopics,
  updateStoryDescription,
} from "@/server/queries/supabase/editor/publish/stories"
import { publishStory } from "@/server/queries/supabase/stories/table/post-table-services"
import _ from "lodash"
import { toast } from "sonner"

import { Categories, Posts, Profiles, Topics } from "@/types/db_tables"
import { getPostAuthorSlug, nameToSlug } from "@/lib/utils"
import { Option } from "@/components/ui/multiple-selector"
import { dynamicLucidIconProps } from "@/components/icons/lucide-icon"

type TopicsMutiSelectorProps = {
  topics?: Topics[]
  postCategories?: Categories[]
  allCategories?: Categories[] | null
  defaultDescription?: Posts["post_description"]
  setPublishButtonState?: React.Dispatch<
    React.SetStateAction<"idle" | "loading" | "success">
  >
  setSaveButtonState?: React.Dispatch<
    React.SetStateAction<"idle" | "loading" | "success">
  >
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
  allCategories,
  postCategories,
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

  const allCategoriesOptions: Option[] =
    allCategories?.map((category) => ({
      label: category.category_name,
      value: category.category_slug,
      id: category.category_id,
      icon: category.category_icon_name as dynamicLucidIconProps,
    })) || []

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

  const handlePublish = async (
    post_id: Posts["post_id"],
    post_description: Posts["post_description"],
    topics?: Option[],
    profile?: Profiles,
    postCategories?: Option[]
  ) => {
    const author_slug = getPostAuthorSlug(profile)

    const promises = []

    if (post_description !== defaultDescription) {
      if (setPublishButtonState) {
        setPublishButtonState("loading")
      }
      promises.push(updateStoryDescription(post_id, post_description))
      // await updateStoryDescription(post_id, post_description)
    }

    if (
      topics &&
      topics !== defaultTopics &&
      _.isEqual(topics, defaultTopics) === false
    ) {
      if (setPublishButtonState) {
        setPublishButtonState("loading")
      }
      promises.push(handleUpdateTopics(topics, post_id))
      // await handleUpdateTopics(topics, post_id)
    }

    if (
      postCategories &&
      postCategories !== defaultPostCategories &&
      _.isEqual(postCategories, defaultPostCategories) === false
    ) {
      if (setPublishButtonState) {
        setPublishButtonState("loading")
      }
      promises.push(handleUpdatePostCategories(postCategories, post_id))
      // await handleUpdateTopics(topics, post_id)
    }

    if (promises.length > 0) {
      try {
        await Promise.all(promises)
        const { error: publishStoryError } = await publishStory(post_id)
        if (publishStoryError) {
          toast.error("Failed to publish story, please try again later.")
        }
        if (setPublishButtonState) {
          setPublishButtonState("success")
        }
      } catch (error) {
        if (setPublishButtonState) {
          setPublishButtonState("idle")
        }
      } finally {
        if (setPublishButtonState) {
          setTimeout(() => {
            setPublishButtonState("idle")
          }, 2000)
        }

        router.push(`/story/${author_slug}/${post_id}`)
      }
    }
  }

  const handleSave = async (
    post_id: Posts["post_id"],
    post_description: Posts["post_description"],
    topics?: Option[],
    profile?: Profiles,
    postCategories?: Option[]
  ) => {
    const promises = []

    if (post_description !== defaultDescription) {
      if (setSaveButtonState) {
        setSaveButtonState("loading")
      }
      promises.push(updateStoryDescription(post_id, post_description))
    }

    if (
      topics &&
      topics !== defaultTopics &&
      _.isEqual(topics, defaultTopics) === false
    ) {
      if (setSaveButtonState) {
        setSaveButtonState("loading")
      }
      promises.push(handleUpdateTopics(topics, post_id))
    }

    if (
      postCategories &&
      postCategories !== defaultPostCategories &&
      _.isEqual(postCategories, defaultPostCategories) === false
    ) {
      if (setPublishButtonState) {
        setPublishButtonState("loading")
      }
      promises.push(handleUpdatePostCategories(postCategories, post_id))
      // await handleUpdateTopics(topics, post_id)
    }

    if (promises.length > 0) {
      try {
        await Promise.all(promises)
        if (setSaveButtonState) {
          setSaveButtonState("success")
        }
      } catch (error) {
      } finally {
        if (setSaveButtonState) {
          setTimeout(() => {
            setSaveButtonState("idle")
          }, 2000)
        }
        router.push(`/user/stories`)
      }
    }
  }

  return {
    handleSave,
    handlePublish,
    defaultTopics,
    allCategoriesOptions,
    defaultPostCategories,
  }
}
