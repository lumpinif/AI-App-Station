"use client"

import { useRef, useState } from "react"
import { UpdateAppByTitle } from "@/server/data"
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

type TitleFormProps = {
  app_id: App["app_id"]
  app_title: App["app_title"]
}

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required",
    })
    .max(50, { message: "Title is too long" }),
})

const TitleForm = ({ app_id, app_title }: TitleFormProps) => {
  const refTitle = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: app_title,
    },
  })
  const { isSubmitting, isValid } = form.formState
  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = async ({
    title,
  }: z.infer<typeof formSchema>): Promise<void> => {
    if (app_title === title) {
      setIsEditing(false)
      return
    }

    const { updatedApp, error } = await UpdateAppByTitle(app_id, title)

    if (updatedApp) {
      toast.success(`${updatedApp[0].app_title} - App Title Updated`)
      toggleEdit()
    }

    if (typeof error === "string") {
      toast.error(`${error}`)
    } else if (error) {
      toast.error(`${error?.message} - Please try again later`)
    }
  }

  useClickOutside<HTMLDivElement>(refTitle, () => {
    setIsEditing(false)
  })

  return (
    <section className="w-full flex-1">
      {!isEditing ? (
        <div
          className={cn(
            "group flex items-center justify-start space-x-2 md:space-x-4"
          )}
        >
          <span
            className="text-lg font-bold hover:cursor-pointer sm:text-3xl md:text-4xl"
            onClick={() => setIsEditing(true)}
          >
            {app_title}
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
            <div className="flex items-center space-x-2" ref={refTitle}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoFocus
                        // defaultValue={app_title}
                        disabled={isSubmitting}
                        placeholder="Enter App Title"
                        {...field}
                        className="ring-offset-background h-fit w-full text-nowrap border-0 bg-transparent p-0 text-lg font-bold outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-3xl md:max-w-48 md:text-4xl"
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

                {app_title !== form.getValues("title") && (
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
              </div>
            </div>
          </form>
        </Form>
      )}
    </section>
  )
}

export default TitleForm
