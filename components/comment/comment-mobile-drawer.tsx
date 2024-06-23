import { TCommentWithProfile } from "@/types/db_tables"

import {
  EnhancedDrawer,
  EnhancedDrawerClose,
  EnhancedDrawerContent,
  EnhancedDrawerTrigger,
} from "../shared/enhanced-drawer"
import { ProgressiveBlur } from "../shared/progressive-blur"
import { CommentCard } from "./comment-card"

type CommentMobileDrawerProps = {
  children: React.ReactNode
  firstComment: TCommentWithProfile
}

export const CommentMobileDrawer: React.FC<CommentMobileDrawerProps> = ({
  children,
  firstComment,
}) => {
  return (
    <EnhancedDrawer>
      <EnhancedDrawerTrigger asChild>
        <div className="flex flex-col space-y-2">
          <CommentCard
            comment={firstComment}
            className="w-full cursor-pointer rounded-lg bg-muted p-4 dark:bg-muted/20"
          />
          <span className="cursor-pointer text-end text-xs text-muted-foreground/60 ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
            tap to check more
          </span>
        </div>
      </EnhancedDrawerTrigger>
      <EnhancedDrawerContent
        drawerHeight="h-[80%]"
        shouldScaleBackground={true}
        className="rounded-t-3xl ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <EnhancedDrawerClose title="Ratings & Reviews" />
        {children}
        {/* <ProgressiveBlur className="h-24" /> */}
      </EnhancedDrawerContent>
    </EnhancedDrawer>
  )
}
