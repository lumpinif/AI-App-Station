"use client"

import { AnimatePresence, motion } from "framer-motion"

interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key="page-transition"
        initial={{ x: "80%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        exit={{ x: "-80%", opacity: 0 }}
        className="absolute inset-0 z-50 max-h-dvh backdrop-blur-md"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
