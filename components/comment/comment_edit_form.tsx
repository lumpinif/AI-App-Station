"use client"

import * as React from "react"
import { UpdateComment } from "@/server/data/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Comment, CommentAction } from "@/types/db_tables"
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
  edit: z.string().max(2000, {
    message: "Edit content must not be longer than 400 characters.",
  }),
})

type CommentEditFormProps = Pick<
  CommentAction,
  "comment_id" | "app_id" | "comment" | "isEditing" | "setIsEditing"
> & {
  className?: string
  parent_id?: Comment["parent_id"]
}

const CommentEditForm: React.FC<CommentEditFormProps> = ({
  className,
  comment,
  setIsEditing,
  app_id,
  comment_id,
  parent_id,
}) => {
  const queryClient = useQueryClient()
  const queryKey = ["replies", parent_id]
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      edit: comment,
    },
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
  const edit = form.watch("edit")
  React.useEffect(() => {
    if (textAreaRef.current) {
      setTriggerAutoSize(edit)
    }
  }, [edit])

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true)
    if (values.edit === comment) {
      setLoading(false)
      if (setIsEditing) {
        setIsEditing(false)
      }
      return
    }

    const { updatedComment, error } = await UpdateComment(
      values.edit,
      comment_id,
      app_id
    )

    if (updatedComment) {
      queryClient.invalidateQueries({ queryKey: queryKey })
      setLoading(false)
      if (setIsEditing) {
        setIsEditing(false)
      }
      toast.success("Comment updated")
    }

    if (error) {
      toast.error(`${error} - Please try again later 🥲`)
    }
  }

  const handleCancelClick = () => {
    form.reset()
    if (setIsEditing) {
      setIsEditing(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <FormField
          control={form.control}
          name="edit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Editing Comment
              </FormLabel>
              <FormControl>
                <Textarea
                  defaultValue={comment}
                  className="no-scrollbar rounded-none border-l-0 border-r-0 border-t-0 bg-transparent ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Edit the comment ..."
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
            Edit
          </LoadingButton>
          <Button type="reset" variant={"ghost"} onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default CommentEditForm
