"use client"

import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import type { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableViewOptionsProps<TData> {
  columnsTitles: Record<string, string>
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
  columnsTitles,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          aria-label="Toggle columns"
          className="group ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 size-4 text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary" />
          <span className="text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary">
            View
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-background/80 backdrop-blur-sm"
        sideOffset={10}
        alignOffset={-10}
      >
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                <span className="truncate">
                  {columnsTitles[column.id as keyof typeof columnsTitles]}
                </span>
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
