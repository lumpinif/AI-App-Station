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
            className="bg-muted dark:bg-muted/20 w-full cursor-pointer rounded-lg p-4"
          />
          <span className="text-muted-foreground/60 ring-offset-background cursor-pointer text-end text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
            tap to check more
          </span>
        </div>
      </EnhancedDrawerTrigger>
      <EnhancedDrawerContent className="ring-offset-background h-4/5 max-h-[calc(100vh-2rem)] rounded-t-3xl focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
        <EnhancedDrawerClose title="Ratings & Reviews" />
        {children}
        <ProgressiveBlur className="h-24" />
      </EnhancedDrawerContent>
    </EnhancedDrawer>
  )
}
