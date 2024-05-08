"use client"

import { useRef, useState } from "react"
import { UpdateAppByUrl } from "@/server/data/supabase-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, SquarePen, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useClickOutside from "@/hooks/use-click-out-side"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"

type AppUrlFormProps = {
  app_id: App["app_id"]
  app_url: App["app_url"]
}

const formSchema = z.object({
  url: z
    .string()
    .regex(
      /^https:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
      {
        message: "Invalid URL. Make sure it starts with 'https://'",
      }
    ),
})

export const AppUrlForm: React.FC<AppUrlFormProps> = ({ app_id, app_url }) => {
  const refUrl = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    mode: "all",
    // reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: app_url || "",
    },
  })

  const { isSubmitting, isValid } = form.formState
  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = async ({ url }: z.infer<typeof formSchema>) => {
    const { updatedApp, error } = await UpdateAppByUrl(app_id, url)

    if (updatedApp) {
      toast.success(`${updatedApp[0].app_title} - App Url Updated`)
      toggleEdit()
    }

    if (typeof error === "string") {
      toast.error(`${error}`)
    } else if (error) {
      toast.error(`${error} - Please try again later`)
    }
  }

  useClickOutside<HTMLDivElement>(refUrl, () => {
    setIsEditing(false)
  })

  return (
    <section className="w-fit">
      {!isEditing ? (
        <div
          className={cn(
            "group flex items-center justify-start space-x-2 md:space-x-4"
          )}
        >
          <span
            className="text-base font-medium hover:cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {app_url || "Add App URL Here"}
          </span>
          <Button
            onClick={toggleEdit}
            variant="ghost"
            className="group"
            size={"xs"}
          >
            <SquarePen className="text-muted-foreground group-hover:text-foreground h-4 w-4 opacity-50 transition-opacity duration-300 ease-out group-hover:opacity-100" />
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center space-x-2" ref={refUrl}>
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoFocus
                        disabled={isSubmitting}
                        placeholder="https://example.com"
                        {...field}
                        className="ring-offset-background h-fit w-fit text-nowrap border-0 bg-transparent p-0 text-base font-medium outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-2">
                <Button
                  onClick={toggleEdit}
                  variant="ghost"
                  className="group"
                  size={"xs"}
                >
                  <span className="text-muted-foreground group-hover:text-foreground">
                    <X className="h-4 w-4" />
                  </span>
                </Button>

                {app_url !== form.getValues("url") && (
                  <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    variant="ghost"
                    className="group"
                    size={"xs"}
                    showChildren={false}
                  >
                    <span className="text-muted-foreground group-hover:text-foreground">
                      <Check className="h-4 w-4" />
                    </span>
                  </LoadingButton>
                )}

                {/* {!isValid && (
                  <span className="text-muted-foreground">
                    Invalid URL. Make sure it starts with &apos;https://&apos;
                  </span>
                )} */}
              </div>
            </div>
          </form>
        </Form>
      )}
    </section>
  )
}
