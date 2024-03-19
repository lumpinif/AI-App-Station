"use client"

import { type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { gridItemVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"

export type GridItemProps = { children: React.ReactNode } & VariantProps<
  typeof gridItemVariants
>

const WidgetItem = ({ size, children }: GridItemProps) => {
  return (
    <motion.div
      initial={{
        scale: 0.2,
        y: 120,
        opacity: 0,
      }}
      className={cn(
        gridItemVariants({
          size,
          className: "duration-75 transition-colors ease-in-out",
        })
      )}
    >
      {children}
    </motion.div>
  )
}

export default WidgetItem
