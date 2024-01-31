import { Suspense } from "react"

import { LoadingSpinner } from "@/components/layout/loading-spinner"

import AppSubmitForm from "./_components/submit-form"

const AppSubmitPage = () => {
  return (
    <div className="mx-auto flex max-w-2xl items-center justify-center p-6">
      <div className="h-full w-full">
        <h1 className="text-2xl font-medium">Submit the AI App</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Help us to expand our knowledge for the humanity. What is the name of
          this AI App?
        </p>
        <Suspense fallback={<LoadingSpinner />}>
          <AppSubmitForm />
        </Suspense>
      </div>
    </div>
  )
}

export default AppSubmitPage
