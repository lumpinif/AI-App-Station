import Image from "next/image"
import Link from "next/link"

import { Card } from "@/components/ui/card"

import ContentCarousel from "./_components/carousel/content-carousel"

const AIAppsPage = async () => {
  return (
    <section className="">
      <ContentCarousel isLoop noMarginRight />
      <ContentCarousel className="md:basis-1/2" />
      <ContentCarousel className="md:basis-1/2 lg:basis-1/3" />
    </section>
  )
}

export default AIAppsPage

{
  /* <Card>
                <CardContent className="flex h-56 items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card> */
}
