import { Posts } from "@/types/db_tables"
import { ContentRenderer } from "@/components/editor/content-renderer"

type StoryEditorContentProps = {
  post_content: Posts["post_content"]
}

export const StoryEditorContent: React.FC<StoryEditorContentProps> = ({
  post_content,
}) => {
  if (!post_content || post_content === null) {
    return (
      <section className="flex flex-col space-y-4">
        <div className="relative w-full">
          <span className="text-muted-foreground italic">
            Story content is empty ...
          </span>
        </div>
      </section>
    )
  }

  return <ContentRenderer content={post_content} />
}
