import { toast } from "sonner"

import MultipleSelector, { Option } from "@/components/ui/multiple-selector"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { searchAllCategories } from "@/app/(main)/user/apps/[app_id]/_components/forms/app-categories-form"

type StoryCategoriesMultiSelectorProps = {
  value?: Option[]
  disabled?: boolean
  defaultOptions: Option[]
  onChange?: (options: Option[]) => void
}

export const StoryCategoriesMultiSelector: React.FC<
  StoryCategoriesMultiSelectorProps
> = ({ value, disabled, onChange, defaultOptions }) => {
  return (
    <MultipleSelector
      creatable
      value={value}
      maxSelected={5}
      disabled={disabled}
      onChange={onChange}
      preventDuplicateCreation
      badgeClassName="font-medium"
      defaultOptions={defaultOptions}
      className="rounded-none border-b py-1"
      commandProps={{ className: "space-y-2" }}
      placeholder="Select or Create categories..."
      CommandListCN="dark:border-0 dark:shadow-outline max-w-60"
      onSearch={async (value) => {
        const res = await searchAllCategories(value)
        return res
      }}
      inputProps={{
        maxLength: 25,
        className:
          "!ml-0 placeholder:text-sm sm:placeholder:text-sm placeholder:text-muted-foreground",
      }}
      onMaxSelected={(maxLimit) => {
        toast(
          `You have reached max selected ${maxLimit} categories limit. Please remove some categories to add more.`,
          { position: "top-center", closeButton: false }
        )
      }}
      emptyIndicator={
        <p className="text-center text-xs text-muted-foreground">
          Try to search for some categories to add
        </p>
      }
      loadingIndicator={
        <span className="flex w-full items-center justify-center space-x-2 py-5 text-muted-foreground">
          {/* <p className="text-center text-xs">searching</p> */}
          <LoadingSpinner className="size-2" />
        </span>
      }
    />
  )
}
