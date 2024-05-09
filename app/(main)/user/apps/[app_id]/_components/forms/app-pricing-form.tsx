"use client"

import { useRef } from "react"
import { UpdateAppByPricing } from "@/server/data/supabase-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Check, Info } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { InfoPopover } from "./info-modal"

type AppPricingFormProps = { app_id: App["app_id"]; pricing: App["pricing"] }

const pricing_obj = [
  "Free",
  "In-app purchases",
  "Free & In-app purchases",
  "Paid",
] as const

const pricing_options = [
  { label: "Free", value: "Free" },
  { label: "In-app purchases", value: "In-app purchases" },
  { label: "Free & In-app purchases", value: "Free & In-app purchases" },
  { label: "Paid", value: "Paid" },
] as const

const formSchema = z.object({
  pricing: z.enum(pricing_obj).nullable(),
})

export const AppPricingForm: React.FC<AppPricingFormProps> = ({
  app_id,
  pricing: defaultPricing,
}) => {
  const refPricing = useRef<HTMLDivElement>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pricing: defaultPricing,
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async ({
    pricing,
  }: z.infer<typeof formSchema>): Promise<void> => {
    if (pricing === defaultPricing) {
      toast.error("No changes detected")
      return
    }

    const { updatedApp, error } = await UpdateAppByPricing(app_id, pricing)
    if (updatedApp) {
      toast.success(`${updatedApp[0].app_title} - App Pricing Updated`)
    }
    if (typeof error === "string") {
      toast.error(`${error}`)
    } else if (error) {
      toast.error(`${error} - Please try again later`)
    }
  }

  const isPricingChanged = defaultPricing !== form.watch("pricing")

  return (
    <section className="w-full flex-col space-y-2 sm:space-y-4">
      <span className="flex items-center space-x-2">
        <h1 className="w-fit select-none text-2xl font-semibold">
          Add Pricing
        </h1>
        <InfoPopover>
          <div className="px-2">
            <h3>Pricing Form</h3>
            <Separator />
            <ul className="text-muted-foreground my-2 flex w-full flex-col space-y-2">
              <li className="flex items-center space-x-4">
                <span className="w-full">
                  Select the pricing model for the app
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="w-full">
                  You can only select one pricing model
                </span>
              </li>
            </ul>

            <h3 className="flex items-center space-x-2">
              <Info className="size-4" />
              <span>Key Info</span>
            </h3>
            <Separator />
            <ul className="text-muted-foreground mt-2">
              <li> - Press ✓ to save the selection</li>
              <li> - Avoid selecting unrelated pricing model</li>
              <li> - Please be responsible for your submission</li>
            </ul>
          </div>
        </InfoPopover>
      </span>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-2" ref={refPricing}>
            <FormField
              control={form.control}
              name="pricing"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div
                          className={cn(
                            "group flex w-fit cursor-pointer items-center justify-between ",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            <Badge className="font-normal hover:cursor-pointer">
                              {field.value}
                            </Badge>
                          ) : (
                            <span className=" text-xs">+ Set pricing</span>
                          )}

                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <CaretSortIcon
                                className={cn(
                                  "ml-2 h-4 w-4 shrink-0 cursor-pointer opacity-50 transition-all duration-150 ease-out group-hover:opacity-100",
                                  buttonVariants({
                                    variant: "ghost",
                                    size: "xs",
                                  })
                                )}
                              />
                            </TooltipTrigger>
                            <TooltipContent
                              className="dark:bg-foreground dark:text-background flex items-center text-xs"
                              align="center"
                              side="right"
                            >
                              Select pricing modal
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent
                      className="p-0"
                      align="start"
                      sideOffset={10}
                    >
                      <Command>
                        <CommandInput placeholder="set pricing..." />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            {pricing_options.map((pricing) => (
                              <CommandItem
                                key={pricing.value}
                                value={pricing.value}
                                onSelect={() => {
                                  form.setValue("pricing", pricing.value)
                                  // setIsEditing(false)
                                }}
                                className={cn(
                                  pricing.value === field.value &&
                                    "underline underline-offset-2"
                                )}
                              >
                                {pricing.label}
                                <Check
                                  className={cn(
                                    "text-muted-foreground ml-auto size-4 transition-opacity duration-150 ease-out",
                                    pricing.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              {isPricingChanged && (
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
    </section>
  )
}
