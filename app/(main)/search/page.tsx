"use client"

import { useState } from "react"
import { JSONContent } from "novel"

import { defaultValue } from "./default-value"

const SearchPage = () => {
  const [value, setValue] = useState<JSONContent>(defaultValue)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-xl flex-col gap-6 rounded-md border bg-card p-6">
        <div className="">SearchPage</div>
        <div className="flex w-full max-w-xl flex-col gap-6 rounded-md border bg-card p-6">
          {/* <NovelEditor initialValue={value} onChange={setValue} /> */}
        </div>
      </div>
    </main>
  )
}

export default SearchPage
