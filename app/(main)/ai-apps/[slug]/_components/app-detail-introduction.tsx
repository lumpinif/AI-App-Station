"use client"

import "@/styles/prosemirror.css"

import { useState } from "react"

import { Apps } from "@/types/db_tables"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProgressiveBlur } from "@/components/shared/progressive-blur"

import { IntroductionEditorContent } from "./app-detail-introduction-editor-content"

type AppDetailIntroductionProps = {
  introduction: Apps["introduction"]
}

export const AppDetailIntroduction: React.FC<AppDetailIntroductionProps> = ({
  introduction,
}) => {
  const [showAll, setShowAll] = useState(false)

  if (!introduction || introduction === null) {
    return (
      <section className="flex flex-col space-y-4">
        <h1 className="font-semibold sm:text-2xl">Introduction</h1>
        <div className="relative w-full">
          <span className="italic text-muted-foreground">
            Introduction content is empty ...
          </span>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col space-y-4">
      <h1 className="text-2xl font-semibold">Introduction</h1>
      <div className="relative w-full">
        <button
          className="absolute -bottom-4 right-2 z-50 text-blue-500"
          onClick={() => setShowAll(!showAll)}
        >
          Show {showAll ? "less" : "more"}
        </button>
        {showAll ? (
          <IntroductionEditorContent introduction={introduction} />
        ) : (
          <ScrollArea className="relative h-[50rem] w-full p-2 pb-6">
            <IntroductionEditorContent introduction={introduction} />
            <ProgressiveBlur className="h-20" />
          </ScrollArea>
        )}
      </div>
    </section>
  )
}
