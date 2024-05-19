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
        <item.icon className="text-primary size-6" />
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-primary text-base">{item.title}</h3>
        <p className="text-muted-foreground text-sm">{item.text}</p>
      </div>
    </div>
  )
}
