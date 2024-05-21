import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={7}
      searchableColumnCount={1}
      filterableColumnCount={1}
      cellWidths={["4rem", "7rem", "6rem", "6rem", "4rem", "4rem", "3rem"]}
      shrinkZero
    />
  )
}
