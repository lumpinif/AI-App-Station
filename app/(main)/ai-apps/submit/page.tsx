"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { SubmitApp } from "@/server/data/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

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

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
})

const AppSubmitPage = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { newApp, error } = await SubmitApp(values.title)

    {
      newApp && toast.success(`${newApp[0].title} - App Submited`)
    }

    if (typeof error === "string") {
      toast.error(`${error} 🥲`)
    } else if (error) {
      toast.error(`${error?.message} - Contact Support 🥲`)
    }
  }

  return (
    <div className="mx-auto flex h-full max-w-xl items-center justify-center p-6">
      <div className="h-full w-full bg-blue-200/20">
        <h1 className="text-2xl font-medium">Submit the AI App</h1>
        <p className="text-sm text-foreground">
          What is the name of this AI App ?
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'ChatGPT'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Don&apos;t worry, you can change this later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/ai-apps">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default AppSubmitPage
