import BackButton from "@/components/shared/back-button"
import PageTransition from "@/components/shared/page-transition"

interface SubmitPageLayoutProps {
  children: React.ReactNode
}

const SubmitPageLayout = ({ children }: SubmitPageLayoutProps) => {
  return (
    <PageTransition>
      <div className="flex h-full flex-col">
        <header className="glass-card-background flex h-fit w-full border-b py-2 backdrop-blur-md transition-all duration-200 ease-linear sm:py-4">
          <BackButton className="ml-5 dark:shadow-outline" />
        </header>
        <div className="flex h-full flex-1 flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </PageTransition>
  )
}

export default SubmitPageLayout
