import { memo } from "react"
import dynamic from "next/dynamic"
import { LucideProps } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

export type dynamicLucidIconProps = keyof typeof dynamicIconImports

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

const LucideIcon = ({ name, className, ...props }: IconProps) => {
  console.log("Rendering LucideIcon with name:", name)

  // Check if the name exists in dynamicIconImports
  if (!dynamicIconImports[name]) {
    console.error(
      `Icon with name "${name}" does not exist in dynamicIconImports`
    )
    return null
  }

  const DynamicLucideIcon = dynamic(dynamicIconImports[name], {
    loading: () => <div className={className} />,
  })

  return <DynamicLucideIcon className={className} {...props} />
}

export default memo(LucideIcon)
