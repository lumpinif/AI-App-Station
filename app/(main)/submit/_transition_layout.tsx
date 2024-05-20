import BackButton from "@/components/shared/back-button"
import PageTransition from "@/components/shared/page-transition"

interface SubmitPageLayoutProps {
  children: React.ReactNode
}

const SubmitPageLayout = ({ children }: SubmitPageLayoutProps) => {
  return (
    <PageTransition>
      <div className="flex h-full flex-col">
        <header className="glass-card-background cubic-bezier(0.32, 0.72, 0, 1) flex h-fit w-full border-b py-2 backdrop-blur-md transition-all duration-500">
          <BackButton className="hover:dark:shadow-outline ml-5" />
        </header>
        <div className="bg-background flex h-full flex-1 flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </PageTransition>
  )
}

export default SubmitPageLayout
