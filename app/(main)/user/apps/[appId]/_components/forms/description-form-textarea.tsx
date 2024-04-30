"use client"

import { useEffect, useRef, useState } from "react"
import { UpdateAppByDescription } from "@/server/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { App } from "@/types/db_tables"
import useClickOutside from "@/hooks/use-click-out-side"
import useMediaQuery from "@/hooks/use-media-query"
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

const formSchema = z.object({
  description: z
    .string()
    .min(1, {
      message: "Description is required",
    })
    .max(140, { message: "Description is too long. 140 Chars Max." }),
})

type IntroductionFormTextareaProps = {
  app_id: App["app_id"]
  description: App["description"]
  setIsEditing: (value: boolean) => void
}

export const IntroductionFormTextarea: React.FC<
  IntroductionFormTextareaProps
> = ({ description, app_id, setIsEditing }) => {
  const [triggerAutoSize, setTriggerAutoSize] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const refDescription = useRef<HTMLDivElement>(null)
  const { isMobile } = useMediaQuery()

  const maxH = isMobile ? 60 : 95

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description || "",
    },
  })

  useAutosizeTextArea({
    textAreaRef: textAreaRef?.current,
    triggerAutoSize: triggerAutoSize,
    minHeight: 14,
    maxHeight: maxH,
  })

  const descriptionWatch = form.watch("description")

  useEffect(() => {
    if (textAreaRef.current) {
      setTriggerAutoSize(descriptionWatch)
    }
  }, [descriptionWatch])

  useEffect(() => {
    if (textAreaRef.current) {
      const textarea = textAreaRef.current
      textarea.focus()
      textarea.setSelectionRange(textarea.value.length, textarea.value.length)
    }
  }, [])

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async ({
    description,
  }: z.infer<typeof formSchema>): Promise<void> => {
    const { updatedApp, error } = await UpdateAppByDescription(
      app_id,
      description
    )

    if (updatedApp) {
      toast.success(`App Description Updated`)
      setIsEditing(false)
    }

    if (typeof error === "string") {
      toast.error(`${error}`)
    } else if (error) {
      toast.error(`${error} - Please try again later`)
    }
  }

  useClickOutside<HTMLDivElement>(refDescription, () => {
    setIsEditing(false)
  })

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className="flex w-full items-center justify-between space-x-2"
            ref={refDescription}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="min-h-0 w-full">
                  <FormControl>
                    <Textarea
                      className="no-scrollbar text-muted-foreground ring-offset-background w-full rounded-none border-l-0 border-r-0 border-t-0 bg-transparent p-0 text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-base"
                      disabled={isSubmitting}
                      placeholder="e.g. 'This App is about...'"
                      {...field}
                      ref={textAreaRef}
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setIsEditing(false)}
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
    </>
  )
}
