"use client"

import { useRef, useState } from "react"
import { UpdateAppByCopyRight } from "@/server/data/supabase-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Info, SquarePen, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Apps } from "@/types/db_tables"
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
import { Separator } from "@/components/ui/separator"

import { InfoPopover } from "./info-popover"

type AppCopyRightFormProps = {
  app_id: Apps["app_id"]
  copy_right: Apps["copy_right"]
}

const formSchema = z.object({
  copy_right: z
    .string()
    .min(1, { message: "Copy right is required" })
    .nullable(),
})

export const AppCopyRightForm: React.FC<AppCopyRightFormProps> = ({
  app_id,
  copy_right,
}) => {
  const refCopyRight = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      copy_right: copy_right,
    },
  })
  const { isSubmitting, isValid } = form.formState
  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = async ({
    copy_right: form_copy_right,
  }: z.infer<typeof formSchema>): Promise<void> => {
    if (copy_right === form_copy_right) {
      setIsEditing(false)
      return
    }

    const { updatedApp, error } = await UpdateAppByCopyRight(
      app_id,
      form_copy_right
    )

    if (updatedApp) {
      toast.success(`${updatedApp[0].app_title} - Copy Right Updated`)
      toggleEdit()
    }

    if (typeof error === "string") {
      toast.error(`${error}`)
    } else if (error) {
      toast.error(`${error} - Please try again later`)
    }
  }

  useClickOutside<HTMLDivElement>(refCopyRight, () => {
    setIsEditing(false)
  })
  return (
    <section className="w-full flex-col space-y-2 sm:space-y-4">
      <span className="flex items-center space-x-2">
        <h1 className="w-fit select-none text-xl font-semibold">Copy Right</h1>
        <InfoPopover>
          <div className="px-2">
            <h3>Add Copy Right (optional)</h3>
            <Separator />
            <ul className="text-muted-foreground my-2 flex w-full flex-col space-y-2">
              <li className="flex items-center space-x-4">
                <span className="w-full">
                  Type in the copy right for the app
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="w-full">Keep it short and simple</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="w-full">No need to add the © symbol</span>
              </li>
            </ul>

            <h3 className="flex items-center space-x-2">
              <Info className="size-4" />
              <span>Key Info</span>
            </h3>
            <Separator />
            <ul className="text-muted-foreground mt-2">
              <li> - Press ✓ to save the input value</li>
              <li> - Avoid typing unrelated copy right</li>
              <li> - Please be responsible for your submission</li>
            </ul>
          </div>
        </InfoPopover>
        <span className="text-muted-foreground">(optional)</span>
      </span>
      {!isEditing ? (
        <div
          className={cn(
            "group flex items-center justify-start space-x-2 md:space-x-4"
          )}
        >
          <span
            className={cn(
              "hover:cursor-pointer",
              !copy_right && "text-muted-foreground"
            )}
            onClick={() => setIsEditing(true)}
          >
            {copy_right || "Add Copy Right Here"}
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
            <div className="flex items-center space-x-2" ref={refCopyRight}>
              <FormField
                control={form.control}
                name="copy_right"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoFocus
                        disabled={isSubmitting}
                        placeholder="copy right..."
                        {...field}
                        value={field.value || ""} // Add this line to handle null value
                        className="ring-offset-background h-fit w-full max-w-36 text-nowrap border-0 bg-transparent p-0 text-base font-normal outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
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

                {copy_right !== form.getValues("copy_right") && (
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
