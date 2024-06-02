type StoryPublishPreviewProps = {}

export const StoryPublishPreview: React.FC<StoryPublishPreviewProps> = ({}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="page-title-font text-2xl">Story Preview</div>
        <div className="flex h-80 w-full items-center justify-center rounded-2xl border border-dashed p-2 shadow-sm dark:border-0 dark:shadow-outline sm:w-full">
          Include a high-quality image in your story to make it more inviting to
          readers.
        </div>
      </div>

      <div className="text-muted-foreground">
        Note: Changes here will affect how your story appears in public places —
        not the contents of the story itself.
      </div>
    </>
  )
}
