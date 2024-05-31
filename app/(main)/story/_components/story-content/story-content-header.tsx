type StoryContentHeaderProps = {
  children?: React.ReactNode
}

export const StoryContentHeader: React.FC<StoryContentHeaderProps> = ({
  children,
}) => {
  return (
    <section className="flex w-full items-center justify-between">
      {children}
    </section>
  )
}
