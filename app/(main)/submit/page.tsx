import { cn } from "@/lib/utils"

import AppSubmitForm from "./_components/app-submit-form"

const AppSubmitPage = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-2xl items-center justify-center p-6",
        className
      )}
    >
      <div className="h-full w-full">
        <h1 className="text-2xl font-medium">Submit the AI App</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Help us to expand our knowledge for the whole humanity.
        </p>
        <AppSubmitForm />
      </div>
    </div>
  )
}

export default AppSubmitPage
