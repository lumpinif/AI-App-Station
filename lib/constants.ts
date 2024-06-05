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
  "flex w-full items-center justify-between select-none overflow-hidden hover:bg-accent active:bg-accent bg-card cursor-pointer p-2 transition-all duration-150 ease-out px-4 ",
  {
    variants: {
      variant: {
        "user-card":
          "gap-x-4 rounded-lg active:scale-[0.98] shadow-sm hover:shadow-md",
        "nav-links-card": "mx-0 gap-x-2 justify-start rounded-none py-6",
      },
      size: {},
    },
  }
)

export const inputVariants = cva(
  "border-0 outline-none focus:ring-0 focus:!ring-transparent bg-background transition-all duration-150 ease-out",
  {
    variants: {
      variant: {
        "border-b": "border-b border-boder",
        minimal: "bg-card/10 focus-within:bg-card",
      },
    },
  }
)

// TODO: REMOVE THIS BEFORE PRODUCTION
