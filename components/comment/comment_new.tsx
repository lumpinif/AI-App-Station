import { useState } from "react"
import { Reply } from "lucide-react"

import { CommentWithProfile } from "@/types/db_tables"

type CommentProps = {
  comment: CommentWithProfile
}

const Comment = ({ comment }: CommentProps) => {
  const [replies, setReplies] = useState<CommentWithProfile[]>([])
  const [showReplyForm, setShowReplyForm] = useState(false)

  // Fetch replies for this comment
  // const fetchReplies = async () => {
  //   const { data } = await supabase
  //     .from('comments')
  //     .select('*')
  //     .eq('parent_id', comment.id)
  //   setReplies(data)
  // }

  // Handle reply submission
  // const handleReplySubmit = async (e: React.FormEvent, content: string) => {
  //   e.preventDefault()
  //   // Add reply to Supabase
  //   const { data } = await supabase
  //     .from('comments')
  //     .insert({ content, parent_id: comment.id })
  //   // Fetch updated replies
  //   fetchReplies()
  // }

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="author">{comment.profiles.display_name}</span>
        <span className="created-at">
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>
      <div className="comment-content">{comment.comment}</div>
      <div className="comment-actions">
        <button onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
      </div>
      {/* {showReplyForm && (
        <form onSubmit={(e) => handleReplySubmit(e, '')}>
          <textarea placeholder="Write a reply..." />
          <button type="submit">Submit</button>
        </form>
      )} */}
      {replies.length > 0 && (
        <div className="replies">
          {replies.map((reply) => (
            <Comment key={reply.comment_id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
