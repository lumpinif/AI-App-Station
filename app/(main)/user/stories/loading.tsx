import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={4}
      searchableColumnCount={1}
      filterableColumnCount={1}
      cellWidths={["20rem", "10rem", "10rem", "15rem"]}
      shrinkZero
    />
  )
}
