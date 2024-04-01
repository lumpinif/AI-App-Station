"use client"

import React, { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { DeleteComment } from "@/actions/comment/delete-comment"
import { createClient } from "@/utils/supabase/client"
import { Session } from "@supabase/supabase-js"
import { Loader2 as SpinnerIcon, Trash as TrashIcon } from "lucide-react"
import toast from "react-hot-toast"

import { detailCommentConfig } from "@/config/detail"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface CommentDeleteButtonProps {
  id?: string
  userId?: string
}

const CommentDeleteButton: FC<CommentDeleteButtonProps> = ({
  id = "",
  userId = "",
}) => {
  const supabase = createClient()
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
  const [session, setSession] = React.useState<Session | null>(null)

  // Check authentitication and bookmark states
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [id, session?.user.id, supabase.auth])

  // Delete bookmark
  async function deleteComment() {
    setIsDeleteLoading(true)
    if (id && session?.user.id && userId === session?.user.id) {
      const commentData = {
        id: id,
        userId: session?.user.id,
      }
      const response = await DeleteComment(commentData)
      if (response) {
        setIsDeleteLoading(false)
        toast.success(detailCommentConfig.successDeleted)
        router.refresh()
      } else {
        setIsDeleteLoading(false)
        toast.error(detailCommentConfig.errorDeleted)
      }
    } else {
      setIsDeleteLoading(false)
      toast.error(detailCommentConfig.errorDeleted)
    }
  }

  return (
    <>
      {session?.user.id === userId && (
        <>
          <div className="flex shrink-0 self-center">
            <div className="relative inline-block text-left">
              <div className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                <span className="sr-only">Delete comment</span>
                <TrashIcon
                  onClick={() => setShowDeleteAlert(true)}
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent className="text-md font-sans">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {detailCommentConfig.questionDelete}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {detailCommentConfig.warning}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {detailCommentConfig.cancel}
                </AlertDialogCancel>
                <AlertDialogAction onClick={deleteComment}>
                  {isDeleteLoading ? (
                    <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <TrashIcon className="mr-2 h-4 w-4" />
                  )}
                  <span>{detailCommentConfig.confirm}</span>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  )
}

export default CommentDeleteButton
