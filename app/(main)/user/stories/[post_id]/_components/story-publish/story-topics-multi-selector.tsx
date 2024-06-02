import { toast } from "sonner"

import MultipleSelector, { Option } from "@/components/ui/multiple-selector"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

type StoryTopicsMultiSelectorProps = {
  value?: Option[]
  defaultOptions: Option[]
  disabled?: boolean
  onChange?: (options: Option[]) => void
  searchAllTopics: (value: string) => Promise<Option[]>
}

export const StoryTopicsMultiSelector: React.FC<
  StoryTopicsMultiSelectorProps
> = ({ value, disabled, onChange, defaultOptions, searchAllTopics }) => {
  return (
    <MultipleSelector
      // hidePlaceholderWhenSelected
      disabled={disabled}
      onSearch={async (value) => {
        const res = await searchAllTopics(value)
        return res
      }}
      className="rounded-none border-b py-1"
      inputProps={{
        maxLength: 25,
        className:
          "!ml-0 placeholder:text-sm sm:placeholder:text-sm placeholder:text-muted-foreground",
      }}
      commandProps={{ className: "space-y-2" }}
      CommandListCN="dark:border-0 dark:shadow-outline max-w-60"
      value={value}
      badgeClassName="font-medium"
      onChange={onChange}
      defaultOptions={defaultOptions}
      maxSelected={5}
      onMaxSelected={(maxLimit) => {
        toast(
          `You have reached max selected ${maxLimit} topics limit. Please remove some topics to add more.`,
          { position: "top-center", closeButton: false }
        )
      }}
      placeholder="Select or Create topics..."
      emptyIndicator={
        <p className="text-center text-xs text-muted-foreground">
          Try to search for some topics to add
        </p>
      }
      creatable
      preventDuplicateCreation
      loadingIndicator={
        <span className="flex w-full items-center justify-center space-x-2 py-5 text-muted-foreground">
          {/* <p className="text-center text-xs">searching</p> */}
          <LoadingSpinner className="size-2" />
        </span>
      }
    />
  )
}
