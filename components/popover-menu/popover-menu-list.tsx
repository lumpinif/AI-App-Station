import { EnvelopeClosedIcon, GearIcon, HeartIcon } from "@radix-ui/react-icons"
import { SquarePen, Upload } from "lucide-react"

import { NewStoryButton } from "@/app/(main)/story/_components/story/new-story-button"

type PopoverMenuListProps = {}

const items = [
  {
    title: "Submit an app",
    text: "Contribute to the community",
    icon: Upload,
  },
  {
    title: "Create a new post",
    text: "Share your brilliant mind",
    icon: SquarePen,
    component: <NewStoryButton />,
  },
]

export const PopoverMenuList: React.FC<PopoverMenuListProps> = ({}) => {
  return (
    <>
      {items.map((item, index) => {
        return (
          <li
            key={index}
            className="bg-background w-full select-none rounded-b-[4px] rounded-t-[4px] transition-transform first:rounded-t-[12px] last:rounded-b-[12px] active:scale-[0.98]"
          >
            <div className="flex items-center py-3">
              <div className="px-4">
                <item.icon className="text-primary h-5 w-5" />
              </div>
              <div>
                <h3 className="text-primary text-base">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </div>
            </div>
          </li>
        )
      })}
    </>
  )
}
