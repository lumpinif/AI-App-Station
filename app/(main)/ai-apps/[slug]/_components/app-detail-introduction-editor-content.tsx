import { Apps } from "@/types/db_tables"
import { ContentRenderer } from "@/components/editor/content-renderer"

type IntroductionEditorContentProps = {
  introduction: Apps["introduction"]
}

export const IntroductionEditorContent: React.FC<
  IntroductionEditorContentProps
> = ({ introduction }) => {
  if (!introduction || introduction === null) {
    return (
      <section className="flex flex-col space-y-4">
        <div className="relative w-full">
          <span className="text-muted-foreground italic">
            Introduction content is empty ...
          </span>
        </div>
      </section>
    )
  }

  return <ContentRenderer content={introduction} />
}
