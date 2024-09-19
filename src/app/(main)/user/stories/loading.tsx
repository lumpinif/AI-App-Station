import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={6}
      searchableColumnCount={1}
      filterableColumnCount={1}
      cellWidths={["25rem", "10rem", "10rem", "8rem", "8rem", "5rem"]}
      shrinkZero
    />
  )
}
