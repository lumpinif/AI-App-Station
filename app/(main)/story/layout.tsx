import BackButton from "@/components/shared/back-button"

import StoryPageTitle from "./_components/story-page-title"

interface StoryPageLayoutProps {
  children: React.ReactNode
}

const StoryPageLayout = ({ children }: StoryPageLayoutProps) => {
  return (
    <div className="container flex flex-col">
      <StoryPageTitle />
      <BackButton className="dark:shadow-outline mt-4" />
      <main className="mt-5 flex-1">{children}</main>
    </div>
  )
}

export default StoryPageLayout
