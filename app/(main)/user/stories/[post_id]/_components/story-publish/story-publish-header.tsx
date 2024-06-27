type StoryPublishHeaderProps = { postTitle: string }

export const StoryPublishHeader: React.FC<StoryPublishHeaderProps> = ({
  postTitle,
}) => {
  return (
    <div className="flex flex-col gap-y-4 sm:gap-y-6">
      <span className="page-title-font text-2xl">
        <span className="text-muted-foreground">Publishing:</span> {postTitle}
      </span>
    </div>
  )
}
