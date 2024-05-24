import { Plus, Upload } from "lucide-react"

import useAccountModal from "@/hooks/use-account-modal-store"
import useNewStory from "@/hooks/use-new-story"
import useSearchDialogStore from "@/hooks/use-search-dialog-store"
import useSubmitApp from "@/hooks/use-submit-app"

import { SpinnerButton } from "../shared/spinner-button"
import { CommandGroup, CommandItem } from "../ui/command"

type ProjectsCommandGroupProps = {
  runCommand: (callback: () => unknown, isToggleSearchDialog?: boolean) => void
}

export const ProjectsCommandGroup: React.FC<ProjectsCommandGroupProps> = ({
  runCommand,
}) => {
  const toggleSearchDialog = useSearchDialogStore(
    (state) => state.toggleSearchDialog
  )
  const openAccountModal = useAccountModal((state) => state.openModal)
  const { handleAppSubmitButtonClick } = useSubmitApp()
  const { handleCreateNewStory, isLoading, isUserLogged } =
    useNewStory(toggleSearchDialog)

  return (
    <CommandGroup heading="Projects">
      <CommandItem
        value="new app submit"
        keywords={["submit new app", "submit app"]}
        onSelect={() => {
          runCommand(() => handleAppSubmitButtonClick())
        }}
        className="hover:cursor-pointer"
      >
        <Upload className="text-muted-foreground mr-2 size-4 stroke-[1.5px] md:mr-4" />
        Submit New App
      </CommandItem>

      <CommandItem
        className="!p-0"
        value="write new story"
        keywords={["create new story", "write new story"]}
        onSelect={() => {
          runCommand(() => {
            isUserLogged ? handleCreateNewStory() : openAccountModal()
          }, false)
        }}
      >
        <SpinnerButton
          isLoading={isLoading}
          variant={"ghost"}
          className="h-11 w-full !px-2 hover:bg-transparent"
          motionClassName="justify-start space-x-0"
        >
          <Plus className="text-muted-foreground mr-2 h-4 w-4 md:mr-4" />
          <span className="font-normal">Create New Story</span>
        </SpinnerButton>
      </CommandItem>
    </CommandGroup>
  )
}
