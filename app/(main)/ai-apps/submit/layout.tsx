import BackButton from "@/components/shared/back-button"

interface SubmitPageLayoutProps {
  children: React.ReactNode
}

const SubmitPageLayout = ({ children }: SubmitPageLayoutProps) => {
  return (
    <div className="flex h-full flex-col">
      <BackButton className="m-4 dark:shadow-outline" />
      <div className="flex h-full flex-1 items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default SubmitPageLayout
