import { ScrollArea } from "@/components/ui/scroll-area"
import { BentoGridSecondDemo } from "@/components/today/bento-grid-second-demo"

const TodayPage = async () => {
  return (
    <>
      {/* <ScrollArea className="h-[calc(100vh-66px)] rounded-3xl"> */}
      <section className="grid h-full items-center p-4 pb-8">
        <BentoGridSecondDemo />
      </section>
      {/* </ScrollArea> */}
    </>
  )
}

export default TodayPage
