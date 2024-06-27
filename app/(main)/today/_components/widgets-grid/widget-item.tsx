"use client"

import { type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { gridItemVariants } from "@/lib/variants"

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
          className: "transition-colors duration-75 ease-in-out",
        })
      )}
    >
      {children}
    </motion.div>
  )
}

export default WidgetItem
