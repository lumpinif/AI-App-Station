import Link from "next/link"
import { Rating } from "@mui/material"
import { Star } from "lucide-react"
import moment from "moment"

import { CommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { Icons } from "../icons/icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type CommentProps = {
  comment: CommentWithProfile
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex gap-x-2">
      <div className="relative flex-none shrink-0">
        <Avatar>
          <AvatarImage
            src={comment.profiles.avatar_url as string}
            alt="Avatar"
            className="animate-fade select-none rounded-full"
          />
          <AvatarFallback>
            <span className="flex h-full w-full items-center justify-center bg-muted">
              <Icons.user
                className={cn(
                  "h-[calc(75%)] w-[calc(75%)] animate-fade rounded-full text-muted-foreground"
                )}
              />
            </span>
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex w-full flex-1 flex-col gap-y-2">
        <div className="flex items-center justify-between ">
          <div className="flex flex-col space-y-2">
            {comment.rating && comment.rating > 0 && (
              <Rating
                size="small"
                value={comment.rating}
                readOnly
                precision={0.5}
                emptyIcon={<Star className="fill-muted stroke-0" size={18} />}
              />
            )}
            <div className="flex flex-col space-y-3">
              <div className="flex-col items-center md:flex md:items-start">
                <div className="flex items-center gap-x-2">
                  <h4 className="font-bold">
                    {comment.profiles.display_name
                      ? comment.profiles.display_name
                      : `user_${comment.profiles.user_id.slice(-5)}`}
                  </h4>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    <Link href={""} className="hover:underline">
                      @
                      {comment.profiles.display_name
                        ? comment.profiles.display_name
                        : `user_${comment.profiles.user_id.slice(-5)}`}
                    </Link>
                  </span>
                </div>
                <div className="flex items-center gap-x-2 text-xs md:text-sm">
                  {comment.updated_at ? (
                    <div className="flex items-center gap-x-2">
                      <span className="relative text-muted-foreground">
                        Updated {moment(comment.updated_at).fromNow()}
                        {moment().diff(moment(comment.updated_at), "days") <
                          1 && (
                          <span className="absolute -right-2 top-0 h-1 w-1 rounded-full bg-green-600 md:-right-3 md:h-2 md:w-2" />
                        )}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-2">
                      <span className="text-muted-foreground/60">
                        {moment(comment.created_at).fromNow()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="prose text-primary">
                {comment.comment}
                {/* TODO: CONSIDER MAKING EDIT FORM REPLACE COMMENT WHEN IT IS IN EDITING MODE FROM THE SERVER BY ADDIGN EDITING STATE TO URL */}
                {/* <CommentEditForm app_id={comment.app_id} comment={comment} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
