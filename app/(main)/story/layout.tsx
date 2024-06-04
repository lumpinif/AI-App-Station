import StoryPageTitle from "./_components/story-page-title"

interface StoryPageLayoutProps {
  children: React.ReactNode
}

const StoryPageLayout = ({ children }: StoryPageLayoutProps) => {
  return (
    <div className="container flex w-full flex-col">
      <StoryPageTitle />
      <main className="mt-5 flex-1">{children}</main>
    </div>
  )
}

export default StoryPageLayout
