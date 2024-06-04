"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Categories, Posts, Topics } from "@/types/db_tables"
import { SpinnerButtonCopyType } from "@/types/shared"
import { cn } from "@/lib/utils"
import { mutiSelectorOptionSchema } from "@/lib/validations"
import useUserProfile from "@/hooks/react-hooks/use-user"
import { useStorySaveAndPublish } from "@/hooks/story/use-story-publish"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { StoryCategoriesMultiSelector } from "./story-categories-multi-selector"
import { StoryDescriptionFormTextarea } from "./story-description-form-textarea"
import { StoryPublishActions } from "./story-publish-actions"
import { StoryPublishHeader } from "./story-publish-header"
import { PostPublishPreview } from "./story-publish-preview"
import { StoryTopicsMultiSelector } from "./story-topics-multi-selector"

type StoryPublishDetailsFormProps = {
  topics?: Topics[]
  postTitle: string
  post_id: Posts["post_id"]
  postImagesPublicUrls: string[]
  postCategories?: Categories[]
  allCategories?: Categories[] | null
  post_image_src: Posts["post_image_src"]
  post_description: Posts["post_description"]
}

const formSchema = z.object({
  post_description: z
    .string()
    .max(140, { message: "Description is too long. 140 Chars Max." })
    .nullable(),
  topics: z.array(mutiSelectorOptionSchema).optional(),
  postCategories: z.array(mutiSelectorOptionSchema).optional(),
  post_image_src: z.string().nullable(),
})

export const StoryPublishDetailsForm: React.FC<
  StoryPublishDetailsFormProps
> = ({
  topics,
  post_id,
  postTitle,
  allCategories,
  post_image_src,
  postCategories,
  post_description,
  postImagesPublicUrls,
}) => {
  const { data: profile } = useUserProfile()
  const [publishButtonState, setPublishButtonState] =
    useState<keyof SpinnerButtonCopyType>("idle")
  const [saveButtonState, setSaveButtonState] =
    useState<keyof SpinnerButtonCopyType>("idle")

  const {
    handleSave,
    handlePublish,
    defaultTopics,
    allCategoriesOptions,
    defaultPostCategories,
  } = useStorySaveAndPublish({
    topics,
    allCategories,
    postCategories,
    setSaveButtonState,
    setPublishButtonState,
    defaultImageSrc: post_image_src,
    defaultDescription: post_description,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      post_description: post_description,
      topics: defaultTopics,
      postCategories: defaultPostCategories,
      post_image_src: post_image_src,
    },
  })

  const descriptionWatch = form.watch("post_description")

  const { isSubmitting } = form.formState

  function onPublish(values: z.infer<typeof formSchema>) {
    handlePublish(
      post_id,
      values.post_image_src,
      values.post_description,
      values.topics,
      profile,
      values.postCategories
    )
  }

  function onSave(values: z.infer<typeof formSchema>) {
    handleSave(
      post_id,
      values.post_image_src,
      values.post_description,
      values.topics,
      profile,
      values.postCategories
    )
  }

  return (
    <>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onPublish)}
          className="grid gap-6 p-2 sm:grid-cols-2 sm:gap-10"
        >
          {/* LEFT PANEL */}

          <FormField
            control={form.control}
            name="post_image_src"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormControl>
                  <PostPublishPreview
                    onChange={field.onChange}
                    post_image_src={field.value}
                    postImagesWithUrls={postImagesPublicUrls}
                    disabled={
                      isSubmitting ||
                      saveButtonState === "loading" ||
                      publishButtonState === "loading"
                    }
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          {/* RIGHT PANEL */}
          <div className="flex flex-col justify-between">
            <div className="flex h-full flex-col justify-between gap-y-4">
              <StoryPublishHeader postTitle={postTitle} />
              {/* RIGHT FORMS */}
              <div className="flex h-full flex-1 flex-col justify-between space-y-8 transition-all duration-150 ease-in-out">
                <div className="flex flex-col space-y-8">
                  <FormField
                    control={form.control}
                    name="post_description"
                    render={({ field }) => (
                      <FormItem>
                        <span className="mb-4 flex flex-col">
                          <FormLabel className="text-base">
                            Story Description
                          </FormLabel>
                          <FormLabel className="text-sm font-normal text-muted-foreground">
                            Add a description to your story
                          </FormLabel>
                        </span>
                        <FormControl>
                          <StoryDescriptionFormTextarea
                            {...field}
                            maxLength={140}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            isSubmitting={isSubmitting}
                            defaultValue={post_description ?? ""}
                            descriptionWatch={descriptionWatch}
                            disabled={
                              isSubmitting ||
                              saveButtonState === "loading" ||
                              publishButtonState === "loading"
                            }
                          />
                        </FormControl>
                        {descriptionWatch && descriptionWatch.length > 100 && (
                          <span
                            className={cn(
                              "flex w-full items-center justify-end text-sm text-muted-foreground",
                              descriptionWatch.length === 140
                                ? "text-destructive"
                                : ""
                            )}
                          >
                            <span>{descriptionWatch.length}</span>
                            /140
                          </span>
                        )}
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="topics"
                    render={({ field }) => (
                      <FormItem>
                        <span className="mb-4 flex flex-col">
                          <FormLabel className="text-base">
                            Story Topics
                          </FormLabel>
                          <FormLabel className="text-sm font-normal text-muted-foreground">
                            Add or change topics (up to 5) so readers know what
                            your story is about
                          </FormLabel>
                        </span>
                        <FormControl>
                          <StoryTopicsMultiSelector
                            {...field}
                            disabled={
                              isSubmitting ||
                              saveButtonState === "loading" ||
                              publishButtonState === "loading"
                            }
                            onChange={field.onChange}
                            defaultOptions={defaultTopics}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postCategories"
                    render={({ field }) => (
                      <FormItem>
                        <span className="mb-4 flex flex-col">
                          <FormLabel className="text-base">
                            Story Categories
                          </FormLabel>
                          <FormLabel className="text-sm font-normal text-muted-foreground">
                            Add or change categories (up to 5) so readers know
                            what your story is about
                          </FormLabel>
                        </span>
                        <FormControl>
                          <StoryCategoriesMultiSelector
                            {...field}
                            disabled={
                              isSubmitting ||
                              saveButtonState === "loading" ||
                              publishButtonState === "loading"
                            }
                            defaultOptions={allCategoriesOptions}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <StoryPublishActions
                  saveButtonState={saveButtonState}
                  handleSave={form.handleSubmit(onSave)}
                  publishButtonState={publishButtonState}
                  handlePublish={form.handleSubmit(onPublish)}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
