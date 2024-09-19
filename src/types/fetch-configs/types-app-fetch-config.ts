import { AppDetailsSelectFields } from "@/server/queries/supabase/apps/apps-fetch-by-config"

import { AppRefrencedTables, Apps } from "../db_tables"

/*
  Filters

  .eq('column', 'Equal to')
  .gt('column', 'Greater than')
  .lt('column', 'Less than')
  .gte('column', 'Greater than or equal to')
  .lte('column', 'Less than or equal to')
  .like('column', '%CaseSensitive%')
  .ilike('column', '%CaseInsensitive%')
  .is('column', null)
  .in('column', ['Array', 'Values'])
  .neq('column', 'Not equal to')

 for Arrays

  .contains('array_column', ['array', 'contains'])
  .containedBy('array_column', ['contained', 'by'])
*/

// TODO: CONSIDER EXPLAINING ON THESE @params
type Supabase_Operators =
  | "eq"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "like"
  | "ilike"
  | "is"
  | "in"
  | "neq"
  | "contains"
  | "containedBy"

// TODO: CONSIDER TYPE SAFETY FOR column it can be for example "likes_count" or "apps.app_id"
type FilterType = {
  column: keyof Apps & string
  operator: Supabase_Operators
  value: any
}

type Order = {
  column: keyof Apps & string
  options: { referencedTable?: AppRefrencedTables; ascending: boolean }
}

type Limit = {
  limit: number
  options?: { referencedTable?: string }
}

// Match only rows which satisfy at least one of the filters.
/*
.or('id.in.(5,6,7), arraycol.cs.{"a","b"}')  // Use `()` for `in` filter, `{}` for array values and `cs` for `contains()`.
.or('id.in.(5,6,7), arraycol.cd.{"a","b"}')  // Use `cd` for `containedBy()
.or('id.gt.3,and(id.eq.1,name.eq.Afghanistan)')  // `with use 'or' with 'and'
*/
type Or = {
  filters: string
  options?: {
    referencedTable?: string
  }
}

export type AppFetchConfig = {
  title: string
  order: Order[]
  limit?: Limit
  filters?: FilterType[]
  orFilters?: Or[]
  innerJoinTables?: AppDetailsSelectFields[]
}
