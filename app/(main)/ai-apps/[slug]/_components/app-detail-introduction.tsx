"use client"

import { Content, EditorContent, useEditor } from "@tiptap/react"

import "@/styles/prosemirror.css"

import { useState } from "react"
import { LinearBlur } from "progressive-blur"

import { App } from "@/types/db_tables"
import { ScrollArea } from "@/components/ui/scroll-area"
import { defaultExtensions } from "@/components/editor/extensions"
import { ProgressiveBlur } from "@/components/shared/progressive-blur"

type AppDetailIntroductionProps = {
  data: App["introduction"]
}

export const AppDetailIntroduction: React.FC<AppDetailIntroductionProps> = ({
  data: app_introduction,
}) => {
  const [showAll, setShowAll] = useState(false)
  const editor = useEditor({
    extensions: defaultExtensions,
    content: app_introduction as Content,
    editable: false,
    editorProps: {
      attributes: {
        class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full p-0`,
      },
    },
  })

  if (!app_introduction || app_introduction === null) {
    return (
      <section className="flex flex-col space-y-4">
        <h1 className="text-lg font-semibold sm:text-2xl">Introduction</h1>
        <div className="relative w-full">
          <span className="italic text-muted-foreground">
            No Introduction has been found ...
          </span>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col space-y-4">
      <h1 className="text-lg font-semibold sm:text-2xl">Introduction</h1>
      <div className="relative w-full">
        <button
          className="absolute bottom-0 right-2 z-50 text-blue-500"
          onClick={() => setShowAll(!showAll)}
        >
          Show {showAll ? "less" : "more"}
        </button>
        {showAll ? (
          <EditorContent editor={editor} className="p-2 pb-10" />
        ) : (
          <ScrollArea className="relative h-[30rem] w-full p-2">
            <EditorContent editor={editor} className="pb-24" />
            <ProgressiveBlur className="h-24" />
          </ScrollArea>
        )}
      </div>
    </section>
  )
}
