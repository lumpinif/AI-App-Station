import Link from "next/link"
import { MessageCircle } from "lucide-react"

type AppCommentsBadgeProps = {}

export const AppCommentsBadge: React.FC<AppCommentsBadgeProps> = ({}) => {
  return (
    <>
      <Link href={"#"} className="group hover:underline">
        <div className="m-0 flex items-center gap-x-1 p-0">
          <MessageCircle
            className="stroke-muted-foreground stroke-1 group-hover:fill-muted dark:stroke-muted dark:group-hover:fill-muted"
            size={16}
          />
          <span className="text-xs">10k+</span>
        </div>
      </Link>
    </>
  )
}
