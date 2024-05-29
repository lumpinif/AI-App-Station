import { usePathname } from "next/navigation"

import { AppCommentWithProfile } from "@/types/db_tables"
import { getSiteUrl } from "@/lib/utils"

import { ShareModal } from "../shared/share-modal"
import { Dialog } from "../ui/dialog"
import { Drawer } from "../ui/drawer"

type CommentShareModalProps = React.ComponentPropsWithoutRef<typeof Dialog> &
  React.ComponentPropsWithoutRef<typeof Drawer> & {
    comment: AppCommentWithProfile
  }

export const CommentShareModal: React.FC<CommentShareModalProps> = ({
  comment,
  ...props
}) => {
  const pathname = usePathname()
  const url =
    `${getSiteUrl()}${pathname}` || `${window.location.origin}${pathname}`

  return (
    <ShareModal
      withTrigger={false}
      url={url + `#comment-${String(comment.comment_id)}`}
      title={`Comment by "${comment.profiles.full_name || comment.profiles.email}" : "${comment.comment}"`}
      drawerCloseTitle="Share this comment with"
      dialogDescription="Share this comment with your friends and family"
      {...props}
    />
  )
}
