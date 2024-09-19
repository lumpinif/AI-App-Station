"use client"

import React from "react"
import { searchCommand } from "@/server/queries/supabase/search-command"
import { CommandLoading } from "cmdk"

import { Apps } from "@/types/db_tables"

import { CommandGroup, CommandItem } from "../ui/command"

type SearchCommandServerResultsProps = {
  searchQuery: string
}

export const SearchCommandServerResults: React.FC<
  SearchCommandServerResultsProps
> = ({ searchQuery }) => {
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState<Apps[] | null>(null)

  React.useEffect(() => {
    async function search() {
      setLoading(true)
      const { apps, error } = await searchCommand({
        searchTable: "apps",
        searchColumn: "app_title",
        searchTerm: searchQuery,
      })
      setResults(JSON.parse(JSON.stringify(apps)))
      setLoading(false)
    }

    search()
  }, [searchQuery])

  return (
    <>
      {loading && (
        <CommandLoading className="border">Fetching server…</CommandLoading>
      )}
      <CommandGroup heading="Server Search">
        {results?.map((item) => {
          return (
            <CommandItem key={`app-${item.app_id}`} value={item.app_title}>
              {item.app_title}
            </CommandItem>
          )
        })}
      </CommandGroup>
    </>
  )
}
