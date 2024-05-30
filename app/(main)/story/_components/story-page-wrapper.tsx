type StoryPageWrapperProps = {
  children: React.ReactNode
}

const StoryPageWrapper: React.FC<StoryPageWrapperProps> = ({ children }) => {
  return (
    <main className="mx-auto mb-8 flex w-full max-w-4xl flex-col space-y-6 rounded-lg sm:space-y-8 sm:px-6 sm:py-4 md:space-y-10">
      {children}
    </main>
  )
}

export default StoryPageWrapper
