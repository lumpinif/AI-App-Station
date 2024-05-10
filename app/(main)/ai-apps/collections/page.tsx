import Link from "next/link"

import { SIDENAVROUTES } from "@/config/main-routes"

import AiAppsPagesTitle from "../_components/ai-apps-page-title"

export default function CollectionsPage() {
  const collectionRoutes = SIDENAVROUTES.find(
    (route) => route.title === "Collections"
  )

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle title={"Collections"} href={`/ai-apps/collections`} />

      <div className="grid w-full sm:grid-cols-2 md:grid-cols-3">
        {collectionRoutes?.items.map((collection, index) => (
          <div className="col-span-1">
            <Link href={collection.href}>
              {index}-{collection.title}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
