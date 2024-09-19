import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"

type LikeHearProps = {
  isLiked: boolean
  className?: string
}

export const LikeHeart: React.FC<LikeHearProps> = ({ isLiked, className }) => {
  return (
    <Heart
      className={cn(
        "transition-color size-4 stroke-current stroke-[1.5] text-muted-foreground outline-none duration-200 ease-out sm:group-hover:fill-rose-500 sm:group-hover:text-rose-500",
        isLiked && "fill-current text-rose-500",
        className
      )}
    />
  )
}
