"use client"

import { useState } from "react"
import { UpdateAppByTitle } from "@/server/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type TitleFormProps = {
  app_id: App["app_id"]
  app_title: App["app_title"]
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
})

const TitleForm = ({ app_id, app_title }: TitleFormProps) => {
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

  return (
    <section>
      {!isEditing ? (
        <div className={cn("flex items-center justify-start gap-2")}>
          <span className="text-nowrap text-3xl font-bold md:text-4xl">
            {app_title}
          </span>
          <Button
            onClick={toggleEdit}
            variant="ghost"
            className="group"
            size={"sm"}
          >
            <Pencil className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* <InputBorderSpotlight
                        defaultValue={app_title}
                        disabled={isSubmitting}
                        placeholder="e.g. 'Perplexity'"
                        {...field}
                      /> */}
                      <Input
                        defaultValue={app_title}
                        disabled={isSubmitting}
                        placeholder="e.g. 'Perplexity'"
                        {...field}
                        className="h-fit max-w-40 text-nowrap border-0 p-0 text-3xl font-bold outline-none ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 md:max-w-52 md:text-4xl"
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
                  size={"sm"}
                >
                  <span className="text-muted-foreground group-hover:text-foreground">
                    Cancel
                  </span>
                </Button>
                <Button
                  disabled={
                    !isValid ||
                    isSubmitting ||
                    app_title === form.getValues("title")
                  }
                  type="submit"
                  size={"sm"}
                  className="w-14"
                >
                  {isSubmitting ? (
                    // TODO: REMOVE PULSELOADER GLOBALLY
                    // <PulseLoader size={3} margin={1} />
                    <Loader2 className={cn("h-4 w-4 animate-spin")} />
                  ) : (
                    <span className="select-none">Save</span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </section>
  )
}

export default TitleForm
