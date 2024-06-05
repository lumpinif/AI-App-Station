type StoryContentWrapperProps = {
  children: React.ReactNode
}

const StoryContentWrapper: React.FC<StoryContentWrapperProps> = ({
  children,
}) => {
  return (
    <main className="mx-auto mb-4 flex w-full max-w-4xl flex-col space-y-10 rounded-lg sm:space-y-10 sm:px-6 sm:py-4 md:space-y-20">
      {children}
    </main>
  )
}

export default StoryContentWrapper
