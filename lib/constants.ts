import { cva } from "class-variance-authority"

export const gridItemVariants = cva(
  "row-span-1 rounded-xl border border-slate-400/10 p-4",
  {
    variants: {
      size: {
        "1": "col-span-1",
        "2": "col-span-2",
        // "2x1": "md:col-span-2 col-span-full row-span-1 py-4 md:px-8 px-4",
        // "2x2": "md:col-span-2 col-span-full row-span-2 md:p-8 p-4",
        // "2x4":
        //   "md:col-span-2 col-span-full row-span-4 relative overflow-hidden",
      },
    },
    defaultVariants: {
      size: "1",
    },
  }
)

export const cardVariants = cva(
  "relative w-full cursor-pointer gap-4 rounded-lg bg-card px-4 py-2 text-card-foreground shadow-sm hover:shadow-xl transition-transform duration-200 ease-out overflow-hidden",
  {
    variants: {
      variant: {
        userCard:
          "flex items-center sm:flex-col sm:items-start sm:justify-center",
      },
      size: {},
    },
  }
)
