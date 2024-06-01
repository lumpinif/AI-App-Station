import { CHARS_LIMIT } from "@/config/editor/editor-config"

type StoryEditorWordsCountProps = {
  charsCount: number
}

export const StoryEditorWordsCount: React.FC<StoryEditorWordsCountProps> = ({
  charsCount,
}) => {
  return (
    <div className="flex h-fit select-none rounded-lg bg-accent px-2 py-1 text-xs text-muted-foreground">
      <span>
        {charsCount}/{CHARS_LIMIT}
      </span>
    </div>
  )
}
