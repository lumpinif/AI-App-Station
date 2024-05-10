import dynamic from "next/dynamic"
import { LucideProps } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

export type dynamicLucidIconProps = keyof typeof dynamicIconImports

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

const LucideIcon = ({ name, className, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name], {
    loading: () => <div className={className} />,
  })

  return <LucideIcon className={className} {...props} />
}

export default LucideIcon
