import photos, { Photo } from "@/config/dummy-photos"

import ContentCard from "../../_components/content-card"
import CardModal from "../_components/card-modal"

export default function ContentCardModal({
  params: { id: photoId },
}: {
  params: { id: string }
}) {
  const photo: Photo = photos.find((p) => p.id === photoId)!
  return (
    <div>
      <CardModal>
        <ContentCard photo={photo} />
      </CardModal>
    </div>
  )
}
