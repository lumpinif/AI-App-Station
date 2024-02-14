"use client"

import { useState } from "react"
import { Apps, UpdateAppByDescription } from "@/server/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { PulseLoader } from "react-spinners"
import { toast } from "sonner"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

interface DescriptionFormProps {
  initialData: Apps
  appId: string
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
})

const DescriptionForm = ({ initialData, appId }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  })
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
      toast.error(`${error} 🥲`)
    } else if (error) {
      toast.error(`${error?.message} - Please try again later 🥲`)
    }
  }

  return (
    <section>
      <div className="flex items-center justify-start gap-2 font-medium">
        {!isEditing ? (
          <span
            className={cn(
              "text-sm",
              !initialData.description && "italic text-muted-foreground"
            )}
          >
            {initialData.description || "Add some description ..."}
          </span>
        ) : (
          <span className="text-xl">{initialData.description}</span>
        )}

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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This App is about...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? <PulseLoader size={3} /> : <span>Save</span>}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </section>
  )
}

export default DescriptionForm
