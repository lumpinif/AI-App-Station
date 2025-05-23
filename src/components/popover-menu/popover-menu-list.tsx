import { Plus, Upload } from "lucide-react"

import { usePopoverStore } from "@/hooks/use-popover-store"
import { AppSubmitButton } from "@/components/submit/app-submit-button"
import { WriteNewStoryButton } from "@/app/(main)/story/_components/write-new-story-button"

import { PopoverMenuItem } from "./popover-menu-item"

type PopoverMenuListProps = {}

const submitAppItem = {
  title: "Submit an app",
  text: "Contribute to the community",
  icon: Upload,
}

const newStoryItem = {
  title: "Create a new story",
  text: "Share your brilliant mind with the world",
  icon: Plus,
}

export const PopoverMenuList: React.FC<PopoverMenuListProps> = () => {
  const closePopover = usePopoverStore((state) => state.closePopover)

  const buttonCN =
    "h-full w-full select-none rounded-b-[4px] rounded-t-[4px] bg-background px-2 transition-transform first:rounded-t-[12px] last:rounded-b-[12px] hover:bg-background/80 active:scale-[0.98]"

  return (
    <>
      <AppSubmitButton variant={"ghost"} size={"default"} className={buttonCN}>
        <PopoverMenuItem item={submitAppItem} />
      </AppSubmitButton>
      <WriteNewStoryButton
        variant={"ghost"}
        size={"default"}
        spinnerButtonCN={buttonCN}
        onSuccess={closePopover}
        motionClassName="text-wrap"
      >
        <PopoverMenuItem item={newStoryItem} />
      </WriteNewStoryButton>
    </>
  )
}
