import AppSubmitForm from "./_components/app-submit-form"

const AppSubmitPage = () => {
  return (
    <div className="mx-auto flex max-w-2xl items-center justify-center p-6">
      <div className="h-full w-full">
        <h1 className="text-2xl font-bold tracking-[-.016em] md:text-3xl md:tracking-[-.024em]">
          Submit the AI App
        </h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Help us to expand our knowledge for the whole world.
        </p>
        <AppSubmitForm />
      </div>
    </div>
  )
}

export default AppSubmitPage
