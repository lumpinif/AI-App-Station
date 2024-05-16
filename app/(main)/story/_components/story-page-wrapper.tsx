type StoryPageWrapperProps = {
  children: React.ReactNode
}

const StoryPageWrapper: React.FC<StoryPageWrapperProps> = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 rounded-lg border p-2 shadow-sm sm:space-y-6 sm:px-6 sm:py-4 md:space-y-8">
      {children}
    </div>
  )
}

export default StoryPageWrapper
