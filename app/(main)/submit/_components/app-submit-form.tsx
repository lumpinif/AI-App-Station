"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitApp } from "@/server/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ThreeDots } from "react-loader-spinner"
import { toast } from "sonner"
import * as z from "zod"

import useAccountModal from "@/hooks/use-account-modal-store"
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

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required",
    })
    .max(50, { message: "Title is too long" }),
})

const AppSubmitForm = () => {
  const [existingError, setexistingError] = useState("")
  const OpenModal = useAccountModal((state) => state.OpenModal)
  const router = useRouter()

  useEffect(() => {
    if (existingError === "You need to login to continue.") {
      OpenModal()
    }
  }, [OpenModal, existingError])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    const { newApp, error } = await SubmitApp(values.title)

    if (newApp) {
      setexistingError("")
      toast.success(
        `You're submitting : ${newApp[0].title}  -  Redirecting to continue 🎉 Please Don't refresh.`
      )
      router.push(`/user/apps/${newApp[0].app_id}`)
    }

    if (typeof error === "string") {
      setexistingError(error)
      toast.error(`${error} 🥲`)
    } else if (error) {
      toast.error(`${error?.message} - Please Contact Support 🥲`)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
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
          <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <>
                  Please wait{" "}
                  <ThreeDots
                    color="gray"
                    visible={true}
                    height="20"
                    width="20"
                    ariaLabel="three-dots-loading"
                    wrapperClass="ml-2"
                  />
                </>
              ) : (
                <>Continue</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default AppSubmitForm
