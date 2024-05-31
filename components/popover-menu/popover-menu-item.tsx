import { LucideIcon } from "lucide-react"

type PopoverMenuItemProps = {
  item: {
    title: string
    text: string
    icon: LucideIcon
  }
}

export const PopoverMenuItem: React.FC<PopoverMenuItemProps> = ({ item }) => {
  return (
    <div className="flex w-full items-center justify-start">
      <div className="px-4">
        <item.icon className="size-6 text-primary" />
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-base font-semibold leading-tight tracking-tight">
          {item.title}
        </h3>
        <p className="text-nowrap text-sm font-normal text-muted-foreground">
          {item.text}
        </p>
      </div>
    </div>
  )
}
