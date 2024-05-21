type StoryPageWrapperProps = {
  children: React.ReactNode
}

const StoryPageWrapper: React.FC<StoryPageWrapperProps> = ({ children }) => {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-4 rounded-lg sm:space-y-6 sm:px-6 sm:py-4 md:space-y-8">
      {children}
    </main>
  )
}

export default StoryPageWrapper
