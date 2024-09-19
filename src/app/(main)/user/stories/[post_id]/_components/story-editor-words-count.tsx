import { CHARS_LIMIT } from "@/config/editor/editor-config"
import { cn } from "@/lib/utils"

type StoryEditorWordsCountProps = {
  charsCount: number
}

export const StoryEditorWordsCount: React.FC<StoryEditorWordsCountProps> = ({
  charsCount,
}) => {
  const isMax = charsCount >= CHARS_LIMIT

  return (
    <div className="flex h-fit select-none rounded-lg bg-accent px-2 py-1 text-xs text-muted-foreground">
      <span
        className={cn(
          isMax
            ? "font-bold text-red-500 transition-all duration-150 ease-out"
            : ""
        )}
      >
        {charsCount}/{CHARS_LIMIT}
      </span>
    </div>
  )
}
