"use client"

import "@/styles/prosemirror.css"

import { EditorContent, EditorRoot, type JSONContent } from "novel"
import { ImageResizer } from "novel/extensions"

import { Json } from "@/types/supabase"
import { cn } from "@/lib/utils"
import { defaultExtensions } from "@/components/editor/extensions"

type ContentRendererProps = {
  children?: React.ReactNode
  content: JSONContent | Json | string
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  children,
}) => {
  return (
    <EditorRoot>
      <EditorContent
        editable={false}
        className={cn("rounded-xl")}
        {...(content && { initialContent: content as JSONContent })}
        extensions={[...defaultExtensions]}
        editorProps={{
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
        // slotAfter={<ImageResizer />}
      >
        {children}
      </EditorContent>
    </EditorRoot>
  )
}
