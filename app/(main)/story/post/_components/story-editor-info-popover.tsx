import { Separator } from "@radix-ui/react-dropdown-menu"
import {
  CloudUpload,
  ImageIcon,
  TextCursorInput,
  Type,
  Unplug,
  Video,
} from "lucide-react"

import { InfoPopover } from "@/app/(main)/user/apps/[app_id]/_components/forms/info-popover"

type StoryEditorInfoPopoverProps = {}

export const StoryEditorInfoPopover: React.FC<
  StoryEditorInfoPopoverProps
> = ({}) => {
  return (
    <InfoPopover>
      <div className="px-2">
        <h3>Editor Actions</h3>
        <Separator />

        <ul className="text-muted-foreground my-2 flex w-full flex-col space-y-2">
          <li className="flex items-center space-x-4">
            <Type className="size-4" />
            <span className="w-full">Start typing to add your content</span>
          </li>
          <li className="flex items-center space-x-4">
            <ImageIcon className="size-4" />
            <span className="w-full">
              Drag and drop images to put at where you want
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Video className="size-4" />
            <span className="w-full">Support embeding Youtube videos</span>
          </li>
          <li className="flex items-center space-x-4">
            <TextCursorInput className="size-4" />
            <span className="w-full">Select text to customize it</span>
          </li>
          <li className="flex items-center space-x-4">
            <kbd className="bg-muted rounded p-1">/</kbd>
            <span className="w-full">Press / to open the command menu</span>
          </li>
          <li className="flex items-center space-x-4">
            <Unplug className="size-4" />
            <span className="w-full">Select Text to embed links or videos</span>
          </li>
          <li className="flex items-center space-x-4">
            <CloudUpload className="size-4" />
            <span className="w-full">Automatically saves your content</span>
          </li>
        </ul>

        <h3>Editor Features</h3>
        <Separator />
        <ul className="text-muted-foreground mt-2">
          <li> - Rich text editing</li>
          <li> - Capture Quote</li>
          <li> - To-do List</li>
          <li> - Bullet List</li>
          <li> - Numbered List</li>
          <li> - Uploading Images</li>
          <li> - Embedding Youtube Videos</li>
          <li> - Embedding links</li>
          <li> - Embedding code snippets</li>
        </ul>
      </div>
    </InfoPopover>
  )
}
