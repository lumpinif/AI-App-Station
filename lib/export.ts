import { type Table } from "@tanstack/react-table"

export function exportTableToCSV<TData>(
  /**
   * The table to export.
   * @type Table<TData>
   */
  table: Table<TData>,
  opts: {
    /**
     * The filename for the CSV file.
     * @default "table"
     * @example "tasks"
     */
    filename?: string
    /**
     * The columns to exclude from the CSV file.
     * @default []
     * @example ["select", "actions"]
     */
    excludeColumns?: (keyof TData | "select" | "actions")[]

    /**
     * Whether to export only the selected rows.
     * @default false
     */
    onlySelected?: boolean

    /**
     * Whether to export all data from the selected rows.
     * @default true
     */

    allData?: boolean
  } = {}
): void {
  const {
    filename,
    excludeColumns = [],
    onlySelected = false,
    allData = true,
  } = opts

  // Retrieve headers (column names)
  const headers = table
    .getAllLeafColumns()
    .map((column) => column.id)
    .filter(
      (id) => !excludeColumns.includes(id as keyof TData | "select" | "actions")
    )

  let csvContent: string

  if (allData) {
    // Retrieve all columns from the table data
    const allColumns = Object.keys(table.options.data[0] || {})

    // Get the rows based on the onlySelected option
    const rows = onlySelected
      ? table.getSelectedRowModel().rows.map((row) => row.original)
      : table.options.data

    // Build CSV content with all columns and values
    csvContent = [
      allColumns.join(","),
      ...rows.map((row) =>
        allColumns
          .map((column) => {
            let cellValue: any = row[column as keyof TData]

            // Convert introduction JSON to string
            if (
              (column === "introduction" || column === "post_content") &&
              typeof cellValue === "object"
            ) {
              cellValue = JSON.stringify(cellValue)
            }

            return typeof cellValue === "string"
              ? `"${cellValue.replace(/"/g, '""')}"`
              : cellValue
          })
          .join(",")
      ),
    ].join("\n")
  } else {
    // Build CSV content with rendered headers and rows
    csvContent = [
      headers.join(","),
      ...(onlySelected
        ? table.getSelectedRowModel().rows
        : table.getRowModel().rows
      ).map((row) =>
        headers
          .map((header) => {
            let cellValue = row.getValue(header)

            // Convert introduction JSON to string
            if (header === "introduction" && typeof cellValue === "object") {
              cellValue = JSON.stringify(cellValue)
            }

            return typeof cellValue === "string"
              ? `"${cellValue.replace(/"/g, '""')}"`
              : cellValue
          })
          .join(",")
      ),
    ].join("\n")
  }

  // Create a Blob with CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

  // Create a link and trigger the download
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
