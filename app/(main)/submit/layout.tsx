import BackButton from "@/components/shared/back-button"
import PageTransition from "@/components/shared/page-transition"

interface SubmitPageLayoutProps {
  children: React.ReactNode
}

const SubmitPageLayout = ({ children }: SubmitPageLayoutProps) => {
  return (
    <div className="flex h-full min-h-[calc(100vh-15rem)] flex-col">
      <BackButton className="hover:dark:shadow-outline ml-5" />
      <div className="bg-background flex h-full flex-1 flex-col items-center justify-center ">
        {children}
      </div>
    </div>
  )
}

export default SubmitPageLayout
