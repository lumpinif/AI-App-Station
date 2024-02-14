"use client"

import { motion } from "framer-motion"

interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ x: "80%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute inset-0 bg-background/25"
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
