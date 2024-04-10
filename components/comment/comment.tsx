import Link from "next/link"
import { Rating } from "@mui/material"
import { Star } from "lucide-react"
import moment from "moment"

import { CommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { Icons } from "../icons/icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type CommentProps = {
  comment: CommentWithProfile | null
  className?: string
}

export const Comment: React.FC<CommentProps> = ({ comment, className }) => {
  if (!comment) return "no comment found"

  return (
    <div className={cn("flex space-x-2 sm:space-x-4", className)}>
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
              <div className="flex max-w-full items-center space-x-2">
                <h4 className="flex-none font-semibold">
                  {comment.profiles.display_name
                    ? comment.profiles.display_name
                    : `user_${comment.profiles.user_id.slice(-5)}`}
                </h4>
                <div className="min-w-0 max-w-36 overflow-hidden text-ellipsis md:max-w-60">
                  <span className="whitespace-nowrap text-xs text-muted-foreground md:text-sm">
                    <Link href={""} className="hover:underline">
                      @
                      {comment.profiles.display_name
                        ? comment.profiles.display_name
                        : `user_${comment.profiles.user_id.slice(-5)}`}
                    </Link>
                  </span>
                </div>
                <div className="flex flex-none items-center space-x-2 text-nowrap text-xs md:text-sm">
                  <span className="h-1 w-1 rounded-full bg-muted-foreground " />
                  {comment.updated_at &&
                  moment().diff(moment(comment.updated_at), "minute", true) <
                    30 ? (
                    <div className="flex items-center gap-x-2">
                      <span className="relative text-muted-foreground/60">
                        Just Updated
                        <span className="absolute -right-2 top-1 h-1 w-1 rounded-full bg-green-600 " />
                      </span>
                    </div>
                  ) : (
                    <div>
                      {moment().diff(
                        moment(comment.created_at),
                        "minute",
                        true
                      ) < 30 ? (
                        <div className="flex items-center gap-x-2">
                          <span className="relative text-muted-foreground/60">
                            {moment(comment.created_at).fromNow()}
                            <span className="absolute -right-2 top-1 h-1 w-1 animate-pulse rounded-full bg-green-600" />
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-x-2">
                          <span className="relative text-muted-foreground/60">
                            {moment().diff(
                              moment(comment.created_at),
                              "day",
                              true
                            ) < 1 ? (
                              <span>
                                {moment(comment.created_at).fromNow()}
                              </span>
                            ) : (
                              moment(comment.created_at).format("l")
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="prose text-start font-light leading-6 tracking-wide text-primary">
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
