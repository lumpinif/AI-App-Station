import ContentCarousel from "./_components/carousel/content-carousel"
import HeroCarousel from "./_components/carousel/hero-carousel"

const AIAppsPage = async () => {
  return (
    <div className="">
      <ContentCarousel isLoop></ContentCarousel>
      <ContentCarousel className="md:basis-1/2"></ContentCarousel>
      <ContentCarousel className="md:basis-1/2 lg:basis-1/3"></ContentCarousel>
    </div>
  )
}

export default AIAppsPage
