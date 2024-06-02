import { useRouter } from "next/navigation"
import {
  checkExistingTopics,
  getAllTopics,
  insertStoryTopics,
  insertTopics,
  removeStoryTopics,
  updateStoryDescription,
} from "@/server/queries/supabase/editor/publish/stories"
import { publishStory } from "@/server/queries/supabase/stories/table/post-table-services"
import _ from "lodash"
import { toast } from "sonner"

import { Posts, Profiles } from "@/types/db_tables"
import { getPostAuthorSlug, nameToSlug } from "@/lib/utils"
import { Option } from "@/components/ui/multiple-selector"

type TopicsMutiSelectorProps = {
  defaultTopics: Option[]
  defaultDescription?: Posts["post_description"]
  setPublishButtonState?: React.Dispatch<
    React.SetStateAction<"idle" | "loading" | "success">
  >
  setSaveButtonState?: React.Dispatch<
    React.SetStateAction<"idle" | "loading" | "success">
  >
}

export const useStorySaveAndPublish = ({
  defaultTopics,
  defaultDescription,
  setSaveButtonState,
  setPublishButtonState,
}: TopicsMutiSelectorProps) => {
  const router = useRouter()
  const searchAllTopics = async (value: string): Promise<Option[]> => {
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
        await insertStoryTopics(post_id, newStoryTopicIds)
      }

      if (topicsToRemove.length > 0) {
        const topicIdsToRemove = topicsToRemove.map((d) => d.id as string)

        await removeStoryTopics(post_id, topicIdsToRemove)
      }

      // toast.success("Topics updated")
    } catch (error) {
      console.error("Error updating topics:", error)
      toast.error("Failed updating topics, please try again")
    }
  }

  const handlePublish = async (
    post_id: Posts["post_id"],
    post_description: Posts["post_description"],
    topics?: Option[],
    profile?: Profiles
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
    profile?: Profiles
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
    searchAllTopics,
  }
}
