import React from "react"
import dynamic from "next/dynamic"
import { LucideProps } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

import { LoadingSpinner } from "../shared/loading-spinner"

export type dynamicLucidIconProps = keyof typeof dynamicIconImports

export interface LucideIconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

const _Icon = ({ name, className, ...props }: LucideIconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name], {
    loading: () => <LoadingSpinner className={className} />,
  })

  return <LucideIcon className={className} {...props} />
}

// 🩹 Fix for unnecessary re-renders
const LucideIcon = React.memo(_Icon)

export default LucideIcon
