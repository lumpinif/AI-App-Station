"use client"

import { useRef, useState } from "react"
import {
  checkExistingDevelopers,
  getAllDevelopers,
  insertAppsDevelopers,
  insertDevelopers,
  removeAppsDevelopers,
} from "@/server/data/supabase-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Info, Loader2, Plus, Search, Tags, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { App, Developer } from "@/types/db_tables"
import { cn, nameToSlug } from "@/lib/utils"
import useClickOutside from "@/hooks/use-click-out-side"
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
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { InfoPopover } from "./info-modal"

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
          <h1 className="w-fit select-none text-2xl font-semibold">
            Add Developers
          </h1>
          <InfoPopover>
            <div className="px-2">
              <h3>Selector Actions</h3>
              <Separator />

              <ul className="text-muted-foreground my-2 flex w-full flex-col space-y-2">
                <li className="flex items-center space-x-4">
                  <Plus className="size-4" />
                  <span className="w-full">
                    Click + to add or create developers
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <Tags className="size-4" />
                  <span className="w-full">
                    You can select more than one developers
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <Search className="size-4" />
                  <span className="w-full">
                    Search for developers in the database
                  </span>
                </li>
              </ul>

              <h3 className="flex items-center space-x-2">
                <Info className="size-4" />
                <span>Key Info</span>
              </h3>
              <Separator />
              <ul className="text-muted-foreground mt-2">
                <li>
                  {" "}
                  - Max <span className="text-primary font-medium">5</span>{" "}
                  developers can be selected
                </li>
                <li>
                  -{" "}
                  <span className="text-primary font-medium">Not allowed</span>{" "}
                  to create{" "}
                  <span className="text-primary font-medium">duplicate</span>{" "}
                  developers
                </li>
                <li> - Press ✓ to save the selection</li>
                <li> - Avoid selecting unrelated developers</li>
                <li> - Please be responsible for your submission</li>
              </ul>
            </div>
          </InfoPopover>
        </span>

        {!isEditing ? (
          <div
            className={cn(
              "group flex w-fit items-center justify-start space-x-2 md:space-x-4"
            )}
            onClick={() => setIsEditing(true)}
          >
            <span className="flex h-full flex-wrap items-center justify-start">
              {developers && developers.length > 0 ? (
                developers.map((dev) => (
                  <Badge
                    key={dev.developer_name}
                    className="mb-1 mr-1 cursor-pointer font-normal dark:font-medium"
                    onClick={() => setIsEditing(true)}
                  >
                    {dev.developer_name}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground text-xs">
                  Search or Create developers
                </span>
              )}
            </span>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button onClick={toggleEdit} variant="ghost" size={"xs"}>
                  <Plus className="text-muted-foreground group-hover:text-foreground h-4 w-4 opacity-50 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className="dark:bg-foreground dark:text-background flex items-center text-xs"
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
              className="border-muted-foreground dark:border-border w-full rounded-md border border-dashed p-2 transition-all duration-200 ease-out"
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
                          maxSelected={5}
                          onMaxSelected={(maxLimit) => {
                            toast.warning(
                              `You have reached max selected ${maxLimit} developers limit. Please remove some categories to add more.`
                            )
                          }}
                          placeholder="Search or Create developers..."
                          emptyIndicator={
                            <p className="text-muted-foreground text-center text-xs">
                              Try to create or search for some developers
                            </p>
                          }
                          creatable
                          preventDuplicateCreation
                          loadingIndicator={
                            <span className="text-muted-foreground flex w-full items-center justify-center space-x-2 py-5">
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
