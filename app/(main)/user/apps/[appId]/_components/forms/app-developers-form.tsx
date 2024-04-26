"use client"

import { useRef, useState } from "react"
import {
  checkExistingDevelopers,
  getAllDevelopers,
  insertAppsDevelopers,
  insertDevelopers,
  removeAppsDevelopers,
} from "@/server/data/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Loader2, Plus, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { App, Developer } from "@/types/db_tables"
import { cn, nameToSlug } from "@/lib/utils"
import useClickOutside from "@/hooks/use-click-out-side"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { InfoModal } from "./info-modal"

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
  className?: string
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
      value: developer.developer_slug,
      id: developer.developer_id,
    })) || []

  const res = allDevelopers.filter((option) =>
    option.value.includes(nameToSlug(value))
  )

  return res
}

export const AppDevelopersForm: React.FC<AppDevelopersFormProps> = ({
  app_id,
  developers,
  className,
}) => {
  const defaultDevelopers: Option[] =
    developers?.map((developer) => ({
      label: developer.developer_name,
      value: developer.developer_slug,
      id: developer.developer_id,
    })) || []

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      developers: defaultDevelopers,
    },
  })

  const refSelector = useRef<HTMLDivElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const { isSubmitting, isValid } = form.formState

  const toggleEdit = () => setIsEditing((current) => !current)

  async function onSubmit({ developers }: z.infer<typeof formSchema>) {
    const normalizedDevelopers = developers.map((d) => ({
      ...d,
      value: nameToSlug(d.label),
    }))

    const submittedDeveloperSlugs = new Set(
      normalizedDevelopers.map((d) => d.value)
    )
    const initialDevelopersMap = new Map(
      defaultDevelopers.map((d) => [d.value, d])
    )

    const developersToAdd = normalizedDevelopers.filter(
      (d) => !initialDevelopersMap.has(d.value)
    )
    const developersToRemove = defaultDevelopers.filter(
      (d) => !submittedDeveloperSlugs.has(d.value)
    )

    if (developersToAdd.length === 0 && developersToRemove.length === 0) {
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

      toast.success("Developers updated")
      toggleEdit()
    } catch (error) {
      console.error("Error updating developers:", error)
      toast.error("Failed updating developers, please try again")
    }
  }

  useClickOutside<HTMLDivElement>(refSelector, () => {
    setIsEditing(false)
  })

  return (
    <TooltipProvider>
      <section
        className={cn("w-full flex-col space-y-2 sm:space-y-4", className)}
      >
        <span className="flex items-center space-x-2">
          <h1 className="w-fit select-none text-lg font-semibold hover:cursor-pointer sm:text-2xl">
            Select Developers
          </h1>
          <InfoModal
            infoTitle="Info about the selector"
            tooltipContent="Mutiple Selector"
            dialogContentClassName="max-w-lg h-fit p-6"
            drawerHeight="h-fit"
            drawerContentClassName="p-6"
          >
            <div className="">
              <h3>
                You can click &apos;+&apos; to add existing developers or create
                new developer labels for the app.
              </h3>
            </div>
          </InfoModal>
        </span>
        {!isEditing ? (
          <div
            className={cn(
              "group flex w-fit items-center justify-start space-x-2 md:space-x-4"
            )}
            onClick={() => setIsEditing(true)}
          >
            <span className="flex h-full items-center justify-center space-x-2 md:space-x-2">
              {developers && developers.length > 0 ? (
                developers.map((dev) => (
                  <span
                    key={dev.developer_name}
                    className="w-fit text-sm hover:cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    {dev.developer_slug ? (
                      <span className="h-full select-none">
                        {dev.developer_name}
                      </span>
                    ) : (
                      <span className="h-full select-none">
                        {dev.developer_name}
                      </span>
                    )}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">
                  Search or Create developers
                </span>
              )}
            </span>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button onClick={toggleEdit} variant="ghost" size={"xs"}>
                  <Plus className="h-4 w-4 text-muted-foreground opacity-50 transition-opacity duration-300 ease-out group-hover:text-foreground group-hover:opacity-100" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className="flex items-center text-xs dark:bg-foreground dark:text-background"
                align="center"
                side="right"
              >
                Add more developers
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full rounded-md border border-dashed border-muted-foreground p-2 transition-all duration-200 ease-out dark:border-border"
            >
              <div
                className="flex w-fit items-center space-x-1"
                ref={refSelector}
              >
                <FormField
                  control={form.control}
                  name="developers"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultipleSelector
                          inputProps={{ autoFocus: isEditing }}
                          // hidePlaceholderWhenSelected
                          onSearch={async (value) => {
                            const res = await searchAllDevelopers(value)
                            return res
                          }}
                          value={field.value}
                          badgeClassName="font-medium"
                          onChange={field.onChange}
                          defaultOptions={defaultDevelopers}
                          placeholder="Search or Create developers..."
                          emptyIndicator={
                            <p className="text-center text-xs text-muted-foreground">
                              Try to create or search for some developers
                            </p>
                          }
                          creatable
                          preventDuplicateCreation
                          loadingIndicator={
                            <span className="flex w-full items-center justify-center space-x-2 py-5 text-muted-foreground">
                              <p className="text-center text-xs ">searching</p>
                              <Loader2 className="h-2 w-2 animate-spin" />
                            </span>
                          }
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
                </div>
              </div>
            </form>
          </Form>
        )}
      </section>
    </TooltipProvider>
  )
}
export default AppDevelopersForm
