"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Categories, PostDetails } from "@/types/db_tables"
import { SpinnerButtonCopyType } from "@/types/shared"
import { checkIsSuperUser, cn } from "@/lib/utils"
import { mutiSelectorOptionSchema } from "@/lib/validations"
import useUserProfile from "@/hooks/react-hooks/use-user"
import { useStorySaveAndPublish } from "@/hooks/story/use-story-publish"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

import { StoryCategoriesMultiSelector } from "./story-categories-multi-selector"
import { StoryDescriptionFormTextarea } from "./story-description-form-textarea"
import { StoryPublishActions } from "./story-publish-actions"
import { StoryPublishHeader } from "./story-publish-header"
import { PostPublishPreview } from "./story-publish-preview"
import { StoryTopicsMultiSelector } from "./story-topics-multi-selector"

type StoryPublishDetailsFormProps = {
  post: PostDetails
  currentTitle: string
  postImagesPublicUrls: string[]
  allCategories?: Categories[] | null
}

const formSchema = z.object({
  post_description: z
    .string()
    .max(140, { message: "Description is too long. 140 Chars Max." })
    .nullable(),
  topics: z.array(mutiSelectorOptionSchema).optional(),
  postCategories: z.array(mutiSelectorOptionSchema).optional(),
  post_image_src: z.string().nullable(),
  is_daily_post_checked: z.boolean().default(false).optional(),
})

export const StoryPublishDetailsForm: React.FC<
  StoryPublishDetailsFormProps
> = ({ post, currentTitle, allCategories, postImagesPublicUrls }) => {
  const [publishButtonState, setPublishButtonState] =
    useState<keyof SpinnerButtonCopyType>("idle")
  const [saveButtonState, setSaveButtonState] =
    useState<keyof SpinnerButtonCopyType>("idle")

  const {
    topics,
    post_id,
    daily_post,
    post_image_src,
    post_description,
    post_publish_status,
    categories: postCategories,
  } = post

  const { data: profile } = useUserProfile()
  const isSuperUser = checkIsSuperUser(profile?.profile_role?.role)

  const {
    defaultTopics,
    handlePublishOrSave,
    allCategoriesOptions,
    defaultPostCategories,
    defaultIsDailyPostChecked,
  } = useStorySaveAndPublish({
    topics,
    daily_post,
    allCategories,
    postCategories,
    setSaveButtonState,
    setPublishButtonState,
    defaultImageSrc: post_image_src,
    defaultDescription: post_description,
    post_publish_status: post_publish_status,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      topics: defaultTopics,
      post_image_src: post_image_src,
      post_description: post_description,
      postCategories: defaultPostCategories,
      is_daily_post_checked: defaultIsDailyPostChecked,
    },
  })

  const descriptionWatch = form.watch("post_description")

  const { isSubmitting, isDirty } = form.formState

  function onPublish(values: z.infer<typeof formSchema>) {
    handlePublishOrSave("publish", {
      post_id,
      profile,
      ...values,
    })
  }

  function onSave(values: z.infer<typeof formSchema>) {
    handlePublishOrSave("save", {
      post_id,
      profile,
      ...values,
    })
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
              <StoryPublishHeader postTitle={currentTitle} />
              {/* RIGHT FORMS */}
              <div className="flex h-full flex-1 flex-col justify-between space-y-8 transition-all duration-150 ease-in-out">
                <div className="flex flex-col space-y-8">
                  {/* Description */}
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

                  {/* Topics */}
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

                  {/* Categories */}
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

                  {/* Daily post*/}
                  {isSuperUser && (
                    <FormField
                      control={form.control}
                      name="is_daily_post_checked"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm transition-all duration-150 ease-out hover:shadow-md dark:border-0 dark:shadow-outline">
                          <div className="space-y-0.5">
                            <FormLabel className="page-title-font">
                              Is it a daily Post ?
                            </FormLabel>
                            <FormDescription>
                              Set this post as the daily post to show on the
                              today page
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              className="data-[state=checked]:bg-green-600"
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <StoryPublishActions
                  isEdited={isDirty}
                  saveButtonState={saveButtonState}
                  handleSave={form.handleSubmit(onSave)}
                  publishButtonState={publishButtonState}
                  post_publish_status={post_publish_status}
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
