"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitApp } from "@/server/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { Rocket } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { useUserData } from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"
import useAppSubmitToastStore from "@/hooks/use-app-toast-store"
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
import { InputBorderSpotlight } from "@/components/shared/InputBorderSpotlight"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { SpinnerButton } from "@/components/shared/spinner-button"

// TODO: COMBINE THE FORMSCHEMA WITH THE APP TITLE FORM
const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required",
    })
    .max(50, { message: "Title is too long" }),
})

const AppSubmitForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [existingError, setexistingError] = useState("")
  const openAccountModal = useAccountModal((state) => state.openModal)

  const setToastId = useAppSubmitToastStore((state) => state.setToastId)
  const { data: user } = useUserData()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  function handleSubmitNewApp(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const submitNewAppPromise = async () => {
      const { newApp, error: newAppError } = await SubmitApp(values.title)

      if (newAppError) {
        throw new Error(newAppError.message)
      }

      if (!newApp) {
        throw new Error("Failed to create new App, please try agin.")
      }

      return newApp
    }

    const newAppSubmittingToast = toast.promise(submitNewAppPromise(), {
      dismissible: false,
      duration: 100000,
      loading: (
        <span className="flex items-center gap-x-2">
          <LoadingSpinner size={16} />
          Creating the new app...Please wait
        </span>
      ),
      success: (newApp) => {
        router.push(`/user/apps/${newApp.app_id}`)
        setToastId(newAppSubmittingToast)
        setIsLoading(false)

        return (
          <div className="flex w-full items-center justify-between">
            <span className="flex items-center gap-x-2">
              <LoadingSpinner size={16} />
              Redircting to the the app details page...Please wait
            </span>
            <Button
              variant={"secondary"}
              size={"sm"}
              className="flex h-8 w-fit shrink-0 flex-nowrap items-center gap-x-2 bg-white text-primary shadow-outline hover:bg-white/80 active:scale-[0.98] dark:border-0 dark:text-background"
              onClick={() => router.push(`/user/apps/${newApp.app_id}`)}
            >
              <Rocket className="size-4 stroke-1" />
              Launch
            </Button>
          </div>
        )
      },
      error: (error) => {
        setIsLoading(false)
        setexistingError(error.message)
        return error || "Error creating new app"
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitNewApp)}
        className="mt-8 space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App title</FormLabel>
              <FormControl>
                <InputBorderSpotlight
                  disabled={isSubmitting}
                  placeholder="e.g. 'ChatGPT'"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {!existingError ? (
                  <span>Don&apos;t worry, you can change this later.</span>
                ) : (
                  <span className="font-medium text-red-600/80 transition-all duration-300 ease-in">
                    {existingError}
                  </span>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-x-2">
          <SpinnerButton
            type="button"
            className="w-24"
            isLoading={isLoading}
            disabled={!isValid || isSubmitting || isLoading}
            onClick={
              !user?.id
                ? openAccountModal
                : form.handleSubmit(handleSubmitNewApp)
            }
          >
            <span>Continue</span>
          </SpinnerButton>
        </div>
      </form>
    </Form>
  )
}

export default AppSubmitForm
