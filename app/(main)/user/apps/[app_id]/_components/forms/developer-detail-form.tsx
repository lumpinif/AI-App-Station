"use client"

import { useState } from "react"
import { UpdateDevByUrlEmail } from "@/server/data/supabase-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { App, Developer } from "@/types/db_tables"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"
import { SpinnerButton } from "@/components/shared/spinner-button"

type DeveloerpDetailFormProps = {
  children?: React.ReactNode
  app_id: App["app_id"]
  developer_id: Developer["developer_id"]
  developer_name: Developer["developer_name"]
  developer_url: Developer["developer_url"]
  developer_email: Developer["developer_email"]
}

// TODO: CHECK THE SCHEMA BEFORE PRODUCTION
const formSchema = z.object({
  developer_email: z
    .string()
    .email({ message: "Invalid Email" })
    .nullable()
    .or(z.literal("")),
  developer_url: z
    .string()
    .regex(
      /^https:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
      {
        message: "Invalid URL. Make sure it starts with 'https://'",
      }
    ),
})

export const DevDetailForm: React.FC<DeveloerpDetailFormProps> = ({
  app_id,
  developer_id,
  developer_name,
  developer_url,
  developer_email,
  children,
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const form = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      developer_url: developer_url || "",
      developer_email: developer_email || "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async ({
    developer_url: form_developer_url,
    developer_email: form_developer_email,
  }: z.infer<typeof formSchema>) => {
    if (
      form_developer_url === developer_url &&
      form_developer_email === developer_email
    ) {
      toast.message(`No need to Submit`, {
        description: "Url and Email are the same as before",
      })
      return
    }

    if (form_developer_url === developer_url) {
      toast.message(`No need to Submit`, {
        description: "Url is same as before",
      })

      return
    }
    if (form_developer_email === developer_email) {
      toast.message(`No need to Submit`, {
        description: "Email is same as before",
      })

      return
    }

    const { updatedDev, error } = await UpdateDevByUrlEmail(
      app_id,
      developer_id,
      form_developer_url,
      form_developer_email
    )

    if (updatedDev) {
      toast.success(`${updatedDev[0].developer_name} - Developer Url Updated`)
    }

    if (typeof error === "string") {
      toast.error(`${error}`)
    } else if (error) {
      toast.error(`${error} - Please try again later`)
    }
  }

  const onChange = (open: boolean) => {
    if (!open) setIsDetailModalOpen(false)
  }

  return (
    <section className="col-span-1 flex w-fit items-center gap-x-2">
      <ResponsiveContentModal
        isOpen={isDetailModalOpen}
        onChange={onChange}
        drawerContentClassName="outline-none rounded-t-3xl"
        drawerHeight="h-fit"
        dialogContentClassName="max-w-xl rounded-2xl"
        title="Developer Details"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="bg-background w-full border-0 p-2 py-6 sm:border sm:p-6">
              <CardHeader className="hidden text-center sm:block">
                <CardTitle>Enter {developer_name} Details</CardTitle>
                <CardDescription>
                  Set developers urls and emails.
                </CardDescription>
              </CardHeader>
              <CardContent className="mx-auto my-2 flex max-w-sm flex-col items-center space-y-4">
                <FormField
                  control={form.control}
                  name="developer_url"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          className="bg-card/10 focus-within:bg-card border-0 outline-none focus:ring-0 focus:!ring-transparent"
                          placeholder="https://example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="pl-3 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="developer_email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          className="bg-card/10 focus-within:bg-card border-0 outline-none focus:ring-0 focus:!ring-transparent"
                          placeholder="(optional) support email of the developer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="pl-3 text-sm" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="mt-6">
                <SpinnerButton
                  type="submit"
                  disabled={!isValid}
                  isLoading={isSubmitting}
                  buttonClassName="w-full sm:w-52 mx-auto"
                >
                  Submit
                </SpinnerButton>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </ResponsiveContentModal>
      <div
        className="hover:cursor-pointer"
        onClick={() => setIsDetailModalOpen(true)}
      >
        {children}
      </div>
    </section>
  )
}
