import BackButton from "@/components/shared/back-button"
import PageTransition from "@/components/shared/page-transition"

interface SubmitPageLayoutProps {
  children: React.ReactNode
}

const SubmitPageLayout = ({ children }: SubmitPageLayoutProps) => {
  return (
    // <PageTransition>
    <div className="flex h-full flex-col space-y-4">
      {/* <div className="flex"> */}
      {/* <header className="glass-card-background flex h-fit w-full border-b py-2 backdrop-blur-md transition-all duration-200 ease-linear"> */}
      {/* </header> */}
      {/* </div> */}
      <main className="flex flex-1 flex-col space-y-4">{children}</main>
    </div>
    // </PageTransition>
  )
}

export default SubmitPageLayout
