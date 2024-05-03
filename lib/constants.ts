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
  "flex w-full items-center justify-between select-none gap-x-2 overflow-hidden rounded-md",
  {
    variants: {
      variant: {
        "user-card":
          "hover:bg-card-hover active:bg-card-hover bg-card cursor-pointer p-2 px-4 shadow-sm transition-all duration-150 ease-out hover:shadow-md active:scale-[0.98] sm:gap-x-4",
        "side-nav-user-card": "border",
      },
      size: {},
    },
  }
)

// TODO: REMOVE THIS BEFORE PRODUCTION
