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

      <div className="container flex flex-1 flex-col space-y-4">
        <span>Editing Mode. Click item to edit.</span>
        {children}
      </div>
    </div>
    // </PageTransition>
  )
}

export default SubmitPageLayout
