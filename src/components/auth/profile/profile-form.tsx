"use client"

import { useRouter } from "next/navigation"
import { updateUserProfile } from "@/server/queries/supabase/profile/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { Control, useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Profiles } from "@/types/db_tables"
import {
  FULL_NAME_MAX_LENGTH,
  USER_BIO_MAX_LENGTH,
  USER_LOCATION_MAX_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_WEBSITE_MAX_LENGTH,
} from "@/config/profile/profile-form-config"
import { websiteValidator } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const profileFormSchema = z.object({
  full_name: z
    .string({
      required_error: "Name is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(FULL_NAME_MAX_LENGTH, {
      message: "Username must not be longer than 30 characters.",
    })
    .nullable(),
  user_name: z
    .string({
      required_error: "Username is required.",
    })
    .min(4, {
      message: "Username must be at least 4 characters.",
    })
    .max(USER_NAME_MAX_LENGTH, {
      message: "Username must not be longer than 15 characters.",
    }),
  user_bio: z.string().max(USER_BIO_MAX_LENGTH).nullable(),
  user_location: z.string().max(USER_LOCATION_MAX_LENGTH).nullable(),
  user_website: websiteValidator.nullable().or(z.literal("")),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

type ProfileFormProps = Profiles & {
  onFormSubmitted?: () => void
}

const TypeCount = ({
  control,
  formName,
  maxLength,
}: {
  formName: keyof ProfileFormValues
  control: Control<ProfileFormValues>
  maxLength: number
}) => {
  const currentTypeCount = useWatch({ control, name: formName })?.length ?? 0

  return (
    <span className="text-xs">
      {currentTypeCount}/{maxLength}
    </span>
  )
}

export function ProfileForm({ onFormSubmitted, ...profile }: ProfileFormProps) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      user_name: profile.user_name,
      full_name: profile.full_name,
      user_bio: profile.user_bio,
      user_website: profile.user_website,
      user_location: profile.user_location,
    },
    mode: "onChange",
  })

  const { isSubmitting, isValid, isDirty } = form.formState

  function onSubmit(profileFormData: ProfileFormValues) {
    if (!isDirty || !isValid) {
      if (onFormSubmitted) onFormSubmitted()
      return
    }

    const updateProfilePromise = async () => {
      const { error: updateUserProfileError } = await updateUserProfile(
        profile.user_id,
        profileFormData
      )

      if (updateUserProfileError) {
        throw new Error(updateUserProfileError.details)
      }
    }

    toast.promise(updateProfilePromise(), {
      loading: "Updating profile...",
      success: () => {
        if (onFormSubmitted) onFormSubmitted()
        queryClient.invalidateQueries({
          queryKey: ["profile"],
          exact: true,
        })
        router.refresh()
        return "Profile updated"
      },
      error: (error) => {
        if (
          error.message.includes(
            "duplicate key value violates unique constraint"
          )
        ) {
          return "Username already exists. Please choose a different username."
        }
        return error || "Error updating profile"
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyUp={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <FormField
          name="full_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between text-muted-foreground">
                Name{" "}
                <TypeCount
                  formName="full_name"
                  control={form.control}
                  maxLength={FULL_NAME_MAX_LENGTH}
                />
              </FormLabel>
              <Input
                placeholder="Beff Jezos"
                {...field}
                value={field.value ?? ""}
                onKeyUp={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between text-muted-foreground">
                Username
                <TypeCount
                  formName="user_name"
                  control={form.control}
                  maxLength={USER_NAME_MAX_LENGTH}
                />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="beff_jezos"
                  {...field}
                  value={field.value ?? ""}
                  onKeyUp={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </FormControl>
              <FormDescription>This is your user name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user_bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between text-muted-foreground">
                Bio
                <TypeCount
                  formName="user_bio"
                  control={form.control}
                  maxLength={USER_BIO_MAX_LENGTH}
                />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                  value={field.value ?? ""}
                  onKeyUp={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between text-muted-foreground">
                Location
                <TypeCount
                  formName="user_location"
                  control={form.control}
                  maxLength={USER_LOCATION_MAX_LENGTH}
                />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Where are you at?"
                  {...field}
                  value={field.value ?? ""}
                  onKeyUp={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user_website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between text-muted-foreground">
                Website
                <TypeCount
                  formName="user_website"
                  control={form.control}
                  maxLength={USER_WEBSITE_MAX_LENGTH}
                />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Website of yourself or your company"
                  {...field}
                  value={field.value ?? ""}
                  onKeyUp={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          data-dismiss="modal"
          className="w-full"
          disabled={isSubmitting || !isValid || !isDirty}
        >
          Update profile
        </Button>
      </form>
    </Form>
  )
}
