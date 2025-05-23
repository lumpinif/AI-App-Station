"use client"

import { useRef, useState } from "react"
import {
  insertAppsCategories,
  removeAppsCategories,
} from "@/server/queries/supabase/apps/editor"
import {
  checkExistingCategories,
  getAllCategories,
  insertCategories,
} from "@/server/queries/supabase/categories"
import { zodResolver } from "@hookform/resolvers/zod"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { Check, Info, Loader2, Plus, Search, Tags, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Apps, Categories } from "@/types/db_tables"
import { cn, nameToSlug } from "@/lib/utils"
import { mutiSelectorOptionSchema } from "@/lib/validations"
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
} from "@/components/ui/tooltip"
import LucideIcon, {
  dynamicLucidIconProps,
} from "@/components/icons/lucide-icon"

import { InfoPopover } from "./info-popover"

const formSchema = z.object({
  categories: z.array(mutiSelectorOptionSchema).min(1),
})

type AppCategoriesFormProps = {
  app_id: Apps["app_id"]
  categories?: Categories[]
  allCategories?: Categories[] | null
  className?: string
}

export const searchAllCategories = async (value: string): Promise<Option[]> => {
  const { categories, error } = await getAllCategories()

  if (error) {
    toast.error(error)
    return []
  }

  const allCategories: Option[] =
    categories?.map((category) => ({
      label: category.category_name,
      value: category.category_slug,
      id: category.category_id,
    })) || []

  const res = allCategories.filter((option) =>
    option.value.includes(nameToSlug(value))
  )

  return res
}

export const AppCategoriesForm: React.FC<AppCategoriesFormProps> = ({
  app_id,
  categories,
  allCategories,
  className,
}) => {
  const defaultCategories: Option[] =
    categories?.map((category) => ({
      label: category.category_name,
      value: category.category_slug,
      id: category.category_id,
      icon: category.category_icon_name as dynamicLucidIconProps,
    })) || []

  const allCategoriesOptions: Option[] =
    allCategories?.map((category) => ({
      label: category.category_name,
      value: category.category_slug,
      id: category.category_id,
      icon: category.category_icon_name as dynamicLucidIconProps,
    })) || []

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: defaultCategories,
    },
  })

  const refSelector = useRef<HTMLDivElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const { isSubmitting, isValid } = form.formState

  const toggleEdit = () => setIsEditing((current) => !current)

  async function onSubmit({ categories }: z.infer<typeof formSchema>) {
    const normalizedCategories = categories.map((c) => ({
      ...c,
      value: nameToSlug(c.label),
    }))

    const submittedCategorySlugs = new Set(
      normalizedCategories.map((c) => c.value)
    )

    const initialCategoriessMap = new Map(
      defaultCategories.map((c) => [c.value, c])
    )

    const categoriesToAdd = normalizedCategories.filter(
      (d) => !initialCategoriessMap.has(d.value)
    )

    const categoriesToRemove = defaultCategories.filter(
      (d) => !submittedCategorySlugs.has(d.value)
    )

    if (categoriesToAdd.length === 0 && categoriesToRemove.length === 0) {
      toggleEdit()
      return
    }

    try {
      const existingCategories = await checkExistingCategories(categoriesToAdd)

      const newCategories = categoriesToAdd.filter(
        (c) =>
          !existingCategories.some(
            (existingCat) => existingCat.category_slug === c.value
          )
      )

      const insertedCategories =
        newCategories.length > 0 ? await insertCategories(newCategories) : []

      const newAppCategoryIds = [
        ...insertedCategories.map((cat) => cat.category_id),
        ...existingCategories
          .filter(
            (cat) =>
              !defaultCategories.some(
                (d) => d.id === cat.category_id.toString()
              )
          )
          .map((cat) => cat.category_id),
      ]

      if (newAppCategoryIds.length > 0) {
        await insertAppsCategories(app_id, newAppCategoryIds)
      }

      if (categoriesToRemove.length > 0) {
        const categoryIdsToRemove = categoriesToRemove.map(
          (c) => c.id as string
        )

        await removeAppsCategories(app_id, categoryIdsToRemove)
      }

      toast.success("Categories updated")
      toggleEdit()
    } catch (error) {
      console.error("Error updating categories:", error)
      toast.error("Failed updating categories, please try again")
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
          <h1 className="w-fit select-none text-xl font-semibold">
            Select Categories
          </h1>
          <InfoPopover>
            <div className="px-2">
              <h3>Selector Actions</h3>
              <Separator />

              <ul className="my-2 flex w-full flex-col space-y-2 text-muted-foreground">
                <li className="flex items-center space-x-4">
                  <Plus className="size-4" />
                  <span className="w-full">
                    Click + to add or create categories
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <Tags className="size-4" />
                  <span className="w-full">
                    You can select more than one categories
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <Search className="size-4" />
                  <span className="w-full">
                    Search for categories in the database
                  </span>
                </li>
              </ul>

              <h3 className="flex items-center space-x-2">
                <Info className="size-4" />
                <span>Key Info</span>
              </h3>
              <Separator />
              <ul className="mt-2 text-muted-foreground">
                <li>
                  {" "}
                  - Max <span className="font-medium text-primary">5</span>{" "}
                  categories can be selected
                </li>
                <li>
                  -{" "}
                  <span className="font-medium text-primary">Not allowed</span>{" "}
                  to create{" "}
                  <span className="font-medium text-primary">duplicate</span>{" "}
                  categories
                </li>
                <li> - Press ✓ to save the selection</li>
                <li> - Avoid selecting unrelated categories</li>
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
              {categories && categories.length > 0 ? (
                categories.map((cat) => (
                  <Badge
                    key={cat.category_name}
                    className="mb-1 mr-2 cursor-pointer font-normal dark:font-medium"
                    onClick={() => setIsEditing(true)}
                  >
                    {cat.category_name}
                    {cat.category_icon_name && (
                      <LucideIcon
                        name={cat.category_icon_name as dynamicLucidIconProps}
                        className="ml-1 size-3 text-background/50"
                      />
                    )}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">
                  Select or Create cateories
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
                Add more categories
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
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultipleSelector
                          inputProps={{ autoFocus: isEditing, maxLength: 25 }}
                          // hidePlaceholderWhenSelected
                          onSearch={async (value) => {
                            const res = await searchAllCategories(value)
                            return res
                          }}
                          value={field.value}
                          badgeClassName="font-medium"
                          onChange={field.onChange}
                          defaultOptions={allCategoriesOptions}
                          maxSelected={5}
                          onMaxSelected={(maxLimit) => {
                            toast(
                              `You have reached max selected ${maxLimit} categories limit. Please remove some categories to add more.`,
                              { position: "bottom-right", closeButton: false }
                            )
                          }}
                          placeholder="Select or Create categories..."
                          emptyIndicator={
                            <p className="text-center text-xs text-muted-foreground">
                              Try to search for some categories
                            </p>
                          }
                          creatable
                          preventDuplicateCreation
                          loadingIndicator={
                            <span className="flex w-full items-center justify-center space-x-2 py-5 text-muted-foreground">
                              <p className="text-center text-xs">searching</p>
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
export default AppCategoriesForm
