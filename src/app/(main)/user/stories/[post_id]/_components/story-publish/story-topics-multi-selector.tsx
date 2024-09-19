import { toast } from "sonner"

import { searchAllTopics } from "@/hooks/story/use-story-publish"
import MultipleSelector, { Option } from "@/components/ui/multiple-selector"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

type StoryTopicsMultiSelectorProps = {
  value?: Option[]
  disabled?: boolean
  defaultOptions: Option[]
  onChange?: (options: Option[]) => void
}

export const StoryTopicsMultiSelector: React.FC<
  StoryTopicsMultiSelectorProps
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
      placeholder="Select or Create topics..."
      CommandListCN="dark:border-0 dark:shadow-outline max-w-60"
      onSearch={async (value) => {
        const res = await searchAllTopics(value)
        return res
      }}
      inputProps={{
        maxLength: 25,
        className:
          "!ml-0 placeholder:text-sm sm:placeholder:text-sm placeholder:text-muted-foreground",
      }}
      onMaxSelected={(maxLimit) => {
        toast(
          `You have reached max selected ${maxLimit} topics limit. Please remove some topics to add more.`,
          { position: "top-center", closeButton: false }
        )
      }}
      emptyIndicator={
        <p className="text-center text-xs text-muted-foreground">
          Try to search for some topics to add
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
