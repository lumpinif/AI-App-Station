"use client"

import { useState } from "react"
import { Apps, UpdateAppByTitle } from "@/server/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { PulseLoader } from "react-spinners"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { InputBorderSpotlight } from "@/components/shared/InputBorderSpotlight"

interface TitleFormProps {
  initialData: Apps
  appId: string
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
})

const TitleForm = ({ initialData, appId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title,
    },
  })
  const { isSubmitting, isValid } = form.formState
  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = async ({
    title,
  }: z.infer<typeof formSchema>): Promise<void> => {
    const { updatedApp, error } = await UpdateAppByTitle(appId, title)

    if (updatedApp) {
      toast.success(`${updatedApp[0].title} - App Updated`)
      toggleEdit()
    }

    if (typeof error === "string") {
      toast.error(`${error} 🥲`)
    } else if (error) {
      toast.error(`${error?.message} - Please try again later 🥲`)
    }
  }

  return (
    <section>
      <div className="flex items-center justify-start gap-2 font-medium">
        <span className="text-xl">{initialData.title}</span>
        <Button
          onClick={toggleEdit}
          variant="ghost"
          className="group"
          size={"sm"}
        >
          {isEditing ? (
            <span className="text-muted-foreground group-hover:text-foreground">
              Cancel
            </span>
          ) : (
            <Pencil className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          )}
        </Button>
      </div>
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputBorderSpotlight
                      defaultValue={initialData.title}
                      disabled={isSubmitting}
                      placeholder="e.g. 'Perplexity'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? (
                  <PulseLoader size={6} margin={1} />
                ) : (
                  <span>Save</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </section>
  )
}

export default TitleForm
