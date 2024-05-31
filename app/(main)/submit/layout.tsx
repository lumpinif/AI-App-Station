import BackButton from "@/components/shared/back-button"
import PageTransition from "@/components/shared/page-transition"

interface SubmitPageLayoutProps {
  children: React.ReactNode
}

const SubmitPageLayout = ({ children }: SubmitPageLayoutProps) => {
  return (
    <div className="flex h-full min-h-[calc(100vh-15rem)] flex-col">
      <BackButton className="ml-5 hover:dark:shadow-outline" />
      <div className="flex h-full flex-1 flex-col items-center justify-center bg-background ">
        {children}
      </div>
    </div>
  )
}

export default SubmitPageLayout
