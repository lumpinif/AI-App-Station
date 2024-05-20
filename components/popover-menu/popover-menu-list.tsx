import { SquarePen, Upload } from "lucide-react"

import { AppSubmitButton } from "@/components/submit/app-submit-button"
import { NewStoryButton } from "@/app/(main)/story/_components/story/new-story-button"

import { PopoverMenuItem } from "./popover-menu-item"

type PopoverMenuListProps = {}

const submitAppItem = {
  title: "Submit an app",
  text: "Contribute to the community",
  icon: Upload,
}

const newStoryItem = {
  title: "Create a new post",
  text: "Share your brilliant mind",
  icon: SquarePen,
}

export const PopoverMenuList: React.FC<PopoverMenuListProps> = () => {
  return (
    <>
      <AppSubmitButton
        variant={"ghost"}
        size={"default"}
        className="hover:bg-background/80 bg-background h-full w-full select-none rounded-b-[4px] rounded-t-[4px] transition-transform first:rounded-t-[12px] last:rounded-b-[12px] active:scale-[0.98]"
      >
        <PopoverMenuItem item={submitAppItem} />
      </AppSubmitButton>
      <NewStoryButton
        variant={"ghost"}
        size={"default"}
        spinnerButtonCN="hover:bg-background/80 bg-background w-full select-none rounded-b-[4px] rounded-t-[4px] transition-transform first:rounded-t-[12px] last:rounded-b-[12px] active:scale-[0.98] h-full"
      >
        <PopoverMenuItem item={newStoryItem} />
      </NewStoryButton>
    </>
  )
}
