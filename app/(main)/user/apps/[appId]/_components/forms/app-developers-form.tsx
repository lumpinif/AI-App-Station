"use client"

import { useState } from "react"
import {
  checkExistingDevelopers,
  getAllDevelopers,
  insertAppsDevelopers,
  insertDevelopers,
  removeAppsDevelopers,
} from "@/server/data/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { App, Developer } from "@/types/db_tables"
import { cn, normalizeDevName, titleToSlug } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import MultipleSelector, { Option } from "@/components/ui/multiple-selector"

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  id: z.string().optional(),
  // disable: z.boolean().optional(),
})

const formSchema = z.object({
  developers: z.array(optionSchema).min(1),
})

type AppDevelopersFormProps = {
  app_id: App["app_id"]
  developers?: Developer[]
}

const searchAllDevelopers = async (value: string): Promise<Option[]> => {
  const { developers, error } = await getAllDevelopers()

  if (error) {
    toast.error(error)
    return []
  }

  const allDevelopers: Option[] =
    developers?.map((developer) => ({
      label: developer.developer_name,
      value: developer.developer_name.toLowerCase(),
      id: developer.developer_id,
    })) || []

  const res = allDevelopers.filter((option) =>
    option.value.includes(normalizeDevName(value))
  )

  return res
}

export const AppDevelopersForm: React.FC<AppDevelopersFormProps> = ({
  app_id,
  developers,
}) => {
  const defaultDevelopers: Option[] =
    developers?.map((developer) => ({
      label: developer.developer_name,
      value: developer.developer_name.toLowerCase(),
      id: developer.developer_id,
    })) || []

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      developers: defaultDevelopers,
    },
  })

  const [isEditing, setIsEditing] = useState(false)
  const { isSubmitting, isValid } = form.formState

  const [isTriggered, setIsTriggered] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)

  async function onSubmit({ developers }: z.infer<typeof formSchema>) {
    const normalizedDevelopers = developers.map((d) => ({
      ...d,
      value: normalizeDevName(d.label),
    }))

    const submittedDeveloperSlugs = new Set(
      normalizedDevelopers.map((d) => d.value)
    )
    const initialDevelopersMap = new Map(
      defaultDevelopers.map((d) => [titleToSlug(d.value), d])
    )

    const developersToAdd = normalizedDevelopers.filter(
      (d) => !initialDevelopersMap.has(d.value)
    )
    const developersToRemove = defaultDevelopers.filter(
      (d) => !submittedDeveloperSlugs.has(titleToSlug(d.value))
    )

    if (developersToAdd.length === 0 && developersToRemove.length === 0) {
      toast.info("No changes detected.")
      toggleEdit()
      return
    }

    try {
      const existingDevelopers = await checkExistingDevelopers(developersToAdd)
      const newDevelopers = developersToAdd.filter(
        (d) =>
          !existingDevelopers.some(
            (existingDev) => existingDev.developer_slug === d.value
          )
      )

      const insertedDevelopers =
        newDevelopers.length > 0 ? await insertDevelopers(newDevelopers) : []

      // const allDeveloperIds = [
      //   ...insertedDevelopers.map((dev) => dev.developer_id),
      //   ...existingDevelopers.map((dev) => dev.developer_id),
      //   ...defaultDevelopers
      //     .filter((d) => submittedDeveloperSlugs.has(titleToSlug(d.value)))
      //     .map((d) => d.id as string),
      // ]

      // if (allDeveloperIds.length > 0) {
      //   await upsertAppsDevelopers(app_id, allDeveloperIds)
      // }

      const newAppDeveloperIds = [
        ...insertedDevelopers.map((dev) => dev.developer_id),
        ...existingDevelopers
          .filter(
            (dev) =>
              !defaultDevelopers.some(
                (d) => d.id === dev.developer_id.toString()
              )
          )
          .map((dev) => dev.developer_id),
      ]

      if (newAppDeveloperIds.length > 0) {
        await insertAppsDevelopers(app_id, newAppDeveloperIds)
      }

      if (developersToRemove.length > 0) {
        const developerIdsToRemove = developersToRemove.map(
          (d) => d.id as string
        )

        await removeAppsDevelopers(app_id, developerIdsToRemove)
      }

      toast.success("Developers updated successfully")
      toggleEdit()
    } catch (error) {
      console.error("Error updating developers:", error)
      toast.error("Failed updating developers, please try again")
    }
  }

  return (
    <section className="w-full flex-col space-y-2 border">
      <h1 className="text-2xl font-semibold tracking-wide">Developers</h1>
      {!isEditing ? (
        <div className={cn("flex items-center justify-start gap-2")}>
          <span className="flex h-full items-center justify-center space-x-1">
            {developers && developers.length > 0 ? (
              developers.map((dev) => (
                <Badge key={dev.developer_name} className="w-fit text-xs">
                  {dev.developer_slug ? (
                    <span className="h-full select-none font-medium">
                      {dev.developer_name}
                    </span>
                  ) : (
                    <span className="font-medium">{dev.developer_name}</span>
                  )}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">
                Search or Create developers ...
              </span>
            )}
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="developers"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultipleSelector
                        // hidePlaceholderWhenSelected
                        onSearch={async (value) => {
                          setIsTriggered(true)
                          const res = await searchAllDevelopers(value)
                          setIsTriggered(false)
                          return res
                        }}
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={defaultDevelopers}
                        placeholder="Search or Create developers ..."
                        emptyIndicator={
                          <p className="text-center text-base leading-10 text-muted-foreground">
                            Try to search for some developers
                          </p>
                        }
                        className="border-0"
                        creatable
                        preventDuplicateCreation
                        loadingIndicator={
                          <p className="py-2 text-center text-base leading-10 text-muted-foreground">
                            loading...
                          </p>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-2 ">
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
                <LoadingButton
                  loading={isSubmitting}
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Confirm
                </LoadingButton>
              </div>
            </div>
          </form>
        </Form>
      )}
    </section>
  )
}
export default AppDevelopersForm
