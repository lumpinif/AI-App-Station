"use client"

import * as React from "react"
import { UpdateComment } from "@/server/data/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { Rating } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { Star } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Comment, CommentActionsProp } from "@/types/db_tables"
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
  rating: z.number().min(0.5).max(5),
})

type CommentEditFormProps = Pick<
  CommentActionsProp,
  "comment" | "setIsEditing" | "className"
> & {
  app_id: Comment["app_id"]
  comment_id: Comment["comment_id"]
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
      edit: comment.comment,
      rating: comment.rating || 4.5,
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
    if (values.edit === comment.comment && values.rating === comment.rating) {
      setLoading(false)
      setIsEditing(false)
      return
    }

    const { updatedComment, error } = await UpdateComment(
      values.edit,
      comment_id,
      app_id,
      values.rating
    )

    if (updatedComment) {
      queryClient.invalidateQueries({ queryKey: queryKey })
      setLoading(false)
      setIsEditing(false)
      toast.success("Comment updated")
    }

    if (error) {
      toast.error(`${error} - Please try again later 🥲`)
    }
  }

  const handleCancelClick = () => {
    form.reset()
    setIsEditing(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("mt-4 space-y-4", className)}
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
                  defaultValue={comment.comment}
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

        {comment.rating && comment.rating > 0 && (
          <>
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex items-center md:justify-between">
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Rating
                        {...field}
                        value={field.value || 4.5}
                        size="small"
                        onChange={(event, newValue) => field.onChange(newValue)}
                        precision={0.5}
                        emptyIcon={
                          <Star className=" fill-muted stroke-0" size={18} />
                        }
                      />
                      <span className="text-sm font-medium text-muted-foreground dark:text-muted">
                        {field.value || 5} stars
                      </span>
                    </div>
                  </FormControl>
                  <span className="text-sm text-muted-foreground dark:text-muted">
                    Tap a Star to Update Rate
                  </span>
                </FormItem>
              )}
            />
            <FormMessage />
          </>
        )}
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
