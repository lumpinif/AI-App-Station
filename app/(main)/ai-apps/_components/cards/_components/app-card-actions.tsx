import {
  Bookmark,
  Ellipsis,
  Heart,
  LogIn,
  SquareArrowOutUpRight,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type AppCardActionsProps = {}

export const AppCardActions: React.FC<AppCardActionsProps> = ({}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="outline-none focus:!ring-0 focus:ring-transparent"
        asChild
      >
        <Button
          variant={"tag"}
          className="relative m-0 flex h-fit items-center justify-center p-0 outline-none focus:ring-0 focus:!ring-transparent"
        >
          <Badge
            variant={"outline"}
            className="group/action cursor-pointer border-0 font-normal outline-none hover:bg-blue-500"
          >
            <Ellipsis className="text-primary dark:text-muted-foreground group-hover/action:text-background dark:group-hover/action:text-primary size-4" />
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="glass-card-background sm:shadow-outline border backdrop-blur-md dark:border-none"
        sideOffset={5}
        align="end"
      >
        <DropdownMenuItem>
          <div className="text-muted-foreground hover:text-popover-foreground flex w-full cursor-pointer items-center justify-between gap-x-4 text-sm">
            <span>Add to Collection</span>
            <Button variant={"tag"} size={"xs"} className="m-0 p-0">
              {/* <Bookmark
                className="fill-blue-600 stroke-blue-600"
                size={16}
              /> */}
              <Bookmark size={16} />
            </Button>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="text-muted-foreground hover:text-popover-foreground flex w-full cursor-pointer items-center justify-between gap-x-4 text-sm">
            <span>Like</span>
            <Button variant={"tag"} size={"xs"} className="m-0 p-0">
              <Heart className="fill-red-600 stroke-red-600" size={16} />
              {/* <Heart size={16} /> */}
            </Button>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="text-muted-foreground hover:text-popover-foreground flex w-full cursor-pointer items-center justify-between gap-x-4 text-sm">
            <span>Share it with</span>
            <Button variant={"tag"} size={"xs"} className="m-0 p-0">
              <SquareArrowOutUpRight size={16} />
            </Button>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
