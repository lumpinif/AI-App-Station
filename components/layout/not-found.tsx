import { PageTitle } from "./page-title"

export function NotFound() {
  return (
    <div className="flex flex-col sm:pl-20">
      <div className="container lg:max-w-4xl">
        <div className="flex items-center gap-10">
          <PageTitle
            title="Page Not found"
            className="text-3xl font-medium"
            isWithAccountModalTrigger={false}
          />
        </div>
        <p className="mt-2 text-muted-foreground">
          This link might be broken, deleted, or moved. Nevertheless, there’s
          nothing to see here...
        </p>
      </div>
    </div>
  )
}
