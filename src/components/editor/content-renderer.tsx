"use client"

import "@/styles/prosemirror.css"

import { EditorContent, EditorRoot, type JSONContent } from "novel"
import { ImageResizer } from "novel/extensions"

import { Json } from "@/types/supabase"
import { cn } from "@/lib/utils"
import { defaultExtensions } from "@/components/editor/extensions"

type ContentRendererProps = {
  className?: string
  children?: React.ReactNode
  content: JSONContent | Json | string
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  children,
  className,
}) => {
  return (
    <EditorRoot>
      <EditorContent
        immediatelyRender={false}
        editable={false}
        className={cn(
          "w-full max-w-full whitespace-normal break-words rounded-xl",
          className
        )}
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
