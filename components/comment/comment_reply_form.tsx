"use client"

import * as React from "react"
import { AddComment } from "@/server/data/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { CommentAction } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useAutosizeTextArea } from "@/components/ui/autosize-textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"

import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

const FormSchema = z.object({
  reply: z.string().max(2000, {
    message: "Reply must not be longer than 400 characters.",
  }),
})

type CommentReplyFormProps = Pick<CommentAction, "parent_id" | "app_id"> & {
  className?: string
  toggleReplying: () => void
}

const CommentReplyForm: React.FC<CommentReplyFormProps> = ({
  className,
  toggleReplying,
  app_id,
  parent_id: replyToCommentId,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [loading, setLoading] = React.useState(false)
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
  const [triggerAutoSize, setTriggerAutoSize] = React.useState("")
  useAutosizeTextArea({
    textAreaRef: textAreaRef?.current,
    triggerAutoSize: triggerAutoSize,
    minHeight: 35,
    maxHeight: 1000,
  })

  /** You can use `form.watch` to trigger auto sizing. */
  const reply = form.watch("reply")
  React.useEffect(() => {
    if (textAreaRef.current) {
      setTriggerAutoSize(reply)
    }
  }, [reply])

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true)

    const { comment, error } = await AddComment(
      values.reply,
      app_id,
      replyToCommentId
    )

    if (comment) {
      setLoading(false)
      // toggleReplying()
    }

    if (error) {
      toast.error(`${error} - Please try again later 🥲`)
    }
  }

  const handleCancelClick = () => {
    form.reset()
    toggleReplying()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <FormField
          control={form.control}
          name="reply"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reply</FormLabel>
              <FormControl>
                <Textarea
                  className="no-scrollbar rounded-none border-l-0 border-r-0 border-t-0 bg-transparent ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Add a reply ..."
                  {...field}
                  ref={textAreaRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2">
          <LoadingButton loading={loading} type="submit">
            Reply
          </LoadingButton>
          <Button type="reset" variant={"ghost"} onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default CommentReplyForm
