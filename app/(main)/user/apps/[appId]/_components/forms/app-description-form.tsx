"use client"

import React, { useState } from "react"
import { UpdateAppByDescription } from "@/server/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Ellipsis, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useAutosizeTextArea } from "@/components/ui/autosize-textarea"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import { Textarea } from "@/components/ui/textarea"

type DescriptionFormProps = {
  app_id: App["app_id"]
  description: App["description"]
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
})

const DescriptionForm = ({
  description,
  app_id: appId,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description || "",
    },
  })

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
  const [triggerAutoSize, setTriggerAutoSize] = React.useState("")
  useAutosizeTextArea({
    textAreaRef: textAreaRef?.current,
    triggerAutoSize: triggerAutoSize,
    minHeight: 30,
    maxHeight: 90,
  })

  const descriptionWatch = form.watch("description")

  React.useEffect(() => {
    if (textAreaRef.current) {
      setTriggerAutoSize(descriptionWatch)
    }
  }, [descriptionWatch])

  const { isSubmitting, isValid } = form.formState
  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = async ({
    description,
  }: z.infer<typeof formSchema>): Promise<void> => {
    const { updatedApp, error } = await UpdateAppByDescription(
      appId,
      description
    )

    if (updatedApp) {
      toast.success(`App Description Updated`)
      toggleEdit()
    }

    if (typeof error === "string") {
      toast.error(`${error}`)
    } else if (error) {
      toast.error(`${error} - Please try again later`)
    }
  }

  return (
    <section className="w-full">
      {!isEditing ? (
        <div className={cn("group flex items-center justify-start space-x-2")}>
          <span
            className={cn(
              "font tracking line-clamp-2 cursor-default text-sm tracking-normal text-muted-foreground hover:cursor-pointer md:line-clamp-3 md:text-base",
              !description && "italic text-muted-foreground"
            )}
            onClick={() => setIsEditing(true)}
          >
            {description || "Add some description here"}
          </span>
          <Button
            onClick={toggleEdit}
            variant="ghost"
            className="group"
            size={"xs"}
          >
            <Ellipsis className="h-4 w-4 text-muted-foreground opacity-10 transition-opacity duration-300 ease-out group-hover:text-foreground group-hover:opacity-100" />
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full items-center justify-between space-x-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        className="no-scrollbar w-full rounded-none border-l-0 border-r-0 border-t-0 bg-transparent px-0 ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        disabled={isSubmitting}
                        placeholder="e.g. 'This App is about...'"
                        {...field}
                        ref={textAreaRef}
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

                {description !== form.getValues("description") && (
                  <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    disabled={
                      !isValid ||
                      isSubmitting ||
                      description === form.getValues("description")
                    }
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

export default DescriptionForm
