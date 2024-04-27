"use client"

import { useRef, useState } from "react"
import { PopoverAnchor } from "@radix-ui/react-popover"
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel"
import { handleCommandNavigation, ImageResizer } from "novel/extensions"
import { handleImageDrop, handleImagePaste } from "novel/plugins"

import { cn } from "@/lib/utils"

import { Separator } from "../ui/separator"
import { defaultExtensions } from "./extensions"
import { uploadFn } from "./image-upload"
// import { ColorSelector } from "./selectors/color-selector"
import { LinkSelector } from "./selectors/link-selector"
import { NodeSelector } from "./selectors/node-selector"
import { TextButtons } from "./selectors/text-buttons"
import { YoutubeSelector } from "./selectors/youtube-selector"
import { slashCommand, suggestionItems } from "./slash-command"

interface EditorProp {
  initialValue?: JSONContent
  onChange: (value: JSONContent) => void
  className?: string
  saveStatus?: string
  setSaveStatus: (status: string) => void
  setCharsCount?: (count: number) => void
}
const NovelEditor = ({
  initialValue,
  onChange,
  className,
  setSaveStatus,
  setCharsCount,
}: EditorProp) => {
  const youtubeTriggerRef = useRef<HTMLDivElement>(null)
  const [openNode, setOpenNode] = useState(false)
  // const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [openYoutubeLink, setOpenYoutubeLink] = useState(false)

  const handleSetCharsCount = (editor: EditorInstance) => {
    if (setCharsCount) {
      setCharsCount(editor.storage.characterCount.characters())
    }
  }

  return (
    <div className="relative w-full">
      <EditorRoot>
        <EditorContent
          className={cn("rounded-xl p-2", className)}
          {...(initialValue && { initialContent: initialValue })}
          extensions={[...defaultExtensions, slashCommand(setOpenYoutubeLink)]}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
          }}
          onUpdate={({ editor }) => {
            onChange(editor.getJSON())
            handleSetCharsCount(editor)
            setSaveStatus("saving")
          }}
          onFocus={({ editor }) => {
            handleSetCharsCount(editor)
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="relative z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems(setOpenYoutubeLink).map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className={cn(
                    "flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:cursor-pointer hover:bg-accent aria-selected:bg-accent"
                  )}
                  key={item.title}
                  ref={item.title === "Youtube" ? youtubeTriggerRef : null}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorBubble
            tippyOptions={{
              placement: "top",
            }}
            className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
          >
            <Separator orientation="vertical" className="h-full w-px" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" className="h-full w-px" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" className="h-full w-px" />
            <TextButtons />
            <Separator orientation="vertical" className="h-full w-px" />
            {/* <ColorSelector open={openColor} onOpenChange={setOpenColor} /> */}
            <YoutubeSelector
              open={openYoutubeLink}
              onOpenChange={setOpenYoutubeLink}
              triggerRef={youtubeTriggerRef}
            />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  )
}

export default NovelEditor
