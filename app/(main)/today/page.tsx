import { ScrollArea } from "@/components/ui/scroll-area"
import { BentoGridSecondDemo } from "@/components/today/bento-grid-second-demo"

const TodayPage = async () => {
  return (
    <>
      <ScrollArea className="h-[calc(100vh-66px)] rounded-3xl">
        <section className="grid items-center gap-6 px-4 pb-8 sm:pt-6 md:py-10">
          <BentoGridSecondDemo />
        </section>
      </ScrollArea>
    </>
  )
}

export default TodayPage
