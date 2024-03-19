import photos, { Photo } from "@/config/dummy-photos"
import BackButton from "@/components/shared/back-button"

import ContentCard from "../_components/content-card"

export default function ContentPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const photo: Photo = photos.find((p) => p.id === id)!

  return (
    <section className="flex flex-col">
      <BackButton className="-ml-4" />
      <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="mt-10 w-full">
          <ContentCard photo={photo} />
        </div>
        <p className="flex">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur
          quidem amet architecto ipsum voluptatibus, non minus nemo? Aliquam sed
          quia incidunt totam enim ea. Architecto sequi magnam dolore aut?
        </p>
      </div>
    </section>
  )
}
