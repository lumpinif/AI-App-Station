import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={7}
      searchableColumnCount={1}
      filterableColumnCount={1}
      cellWidths={["5rem", "7rem", "7rem", "6rem", "5rem", "5rem", "3rem"]}
      shrinkZero
    />
  )
}
