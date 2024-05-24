import { getAllApps } from "@/server/data"
import { searchCommand } from "@/server/queries/supabase/search-command"

import { SearchCommandDialog } from "./search-command-dialog"

export async function SearchCommandDialogProvider() {
  const { apps, error } = await getAllApps()

  return (
    <>
      <SearchCommandDialog serverData={apps} />
    </>
  )
}
