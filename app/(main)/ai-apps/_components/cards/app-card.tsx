import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Bookmark,
  Heart,
  MessageCircle,
  SquareArrowOutUpRight,
} from "lucide-react"

import { AppCardContentWithCategories } from "@/types/db_tables"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

type AppCardWithIndex = AppCardContentWithCategories & {
  index: number
}

const AppCard: React.FC<AppCardWithIndex> = ({
  app_id,
  app_title,
  description,
  categories,
  app_slug,
  index,
}) => {
  return (
    <>
      <div key={app_id} className="flex items-center justify-between gap-x-2">
        {/* Left section */}
        {/* App Icon */}
        <Link
          className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-xl bg-card transition-all duration-200 ease-out hover:shadow-md dark:hover:shadow-outline"
          href={`/ai-apps/${app_slug}`}
        >
          <Image
            src={"/logo.svg"}
            width={200}
            height={200}
            alt={app_title}
            className="aspect-square"
          />
        </Link>

        {/* Right section */}
        <div className="flex w-full flex-1 flex-col gap-y-2">
          <div className="flex items-center justify-between">
            {/* App Title and Category */}
            <Link
              href={`/ai-apps/${app_slug}`}
              className="flex w-28 min-w-0 flex-1 flex-col truncate"
            >
              <span className="truncate text-nowrap hover:underline">
                {app_title}
              </span>
              <span className="truncate text-nowrap text-sm text-muted-foreground">
                {description}
              </span>
            </Link>
            {/* App Actions */}
            <div className="flex flex-none flex-col items-center gap-y-2 ">
              <div className="flex w-full items-center justify-between gap-x-2">
                {/* Comments number */}
                <Link href={"#"} className="group hover:underline">
                  <div className="m-0 flex items-center gap-x-1 p-0">
                    <MessageCircle
                      className="stroke-muted-foreground stroke-1 group-hover:fill-muted dark:stroke-muted dark:group-hover:fill-muted"
                      size={16}
                    />
                    <span className="text-xs">10k+</span>
                  </div>
                </Link>
                {/* Drop Down Menu */}
                <div className="flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none ring-0 ">
                      <Button
                        variant={"tag"}
                        className="relative m-0 flex h-fit items-center justify-center p-0"
                      >
                        <Badge
                          variant={"outline"}
                          className="bg-muted hover:bg-background"
                        >
                          GET
                        </Badge>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-card-background border shadow-outline backdrop-blur-md dark:border-none">
                      <DropdownMenuItem>
                        <div className="flex w-full cursor-pointer items-center justify-between gap-x-4 text-sm text-muted-foreground hover:text-popover-foreground">
                          <span>Add to Collection</span>
                          <Button
                            variant={"tag"}
                            size={"xs"}
                            className="m-0 p-0"
                          >
                            {/* <Bookmark
                              className="fill-blue-600 stroke-blue-600"
                              size={16}
                            /> */}
                            <Bookmark size={16} />
                          </Button>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="flex w-full cursor-pointer items-center justify-between gap-x-4 text-sm text-muted-foreground hover:text-popover-foreground">
                          <span>Like</span>
                          <Button
                            variant={"tag"}
                            size={"xs"}
                            className="m-0 p-0"
                          >
                            <Heart
                              className="fill-red-600 stroke-red-600"
                              size={16}
                            />
                            {/* <Heart size={16} /> */}
                          </Button>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="flex w-full cursor-pointer items-center justify-between gap-x-4 text-sm text-muted-foreground hover:text-popover-foreground">
                          <span>Share it with</span>
                          <Button
                            variant={"tag"}
                            size={"xs"}
                            className="m-0 p-0"
                          >
                            <SquareArrowOutUpRight size={16} />
                          </Button>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {/* Label and description */}
              <div className="flex w-full items-center justify-end gap-x-1 text-nowrap text-[10px] text-muted-foreground">
                {/* Category */}
                <div className="flex items-center gap-x-1">
                  {categories && categories.length > 0 ? (
                    categories?.map((category, index) => (
                      <>
                        <Link
                          key={category.category_id}
                          href={`/ai-apps/categories/${category.slug}`}
                          className="hover:underline"
                        >
                          <span className="text-xs">
                            {category.category_title}
                          </span>
                        </Link>
                        {index !== categories.length - 1 && (
                          <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                        )}
                      </>
                    ))
                  ) : (
                    <span className="text-xs">Set Category</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {index < 2 && <Separator />}
        </div>
      </div>
    </>
  )
}

export default AppCard
