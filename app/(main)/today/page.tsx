import { ScrollArea } from "@/components/shared/scroll-area"
import { BentoGridDemo } from "@/components/today/bento-grid-demo"
import { BentoGridSecondDemo } from "@/components/today/bento-grid-second-demo"
import { getUserSession } from "@/app/(auth)/auth-actions"

const TodayPage = async () => {
  return (
    <>
      {/* <ScrollArea> */}
      <section className="contianer grid items-center gap-6 px-4 pb-8 sm:pt-6 md:py-10 ">
        <BentoGridSecondDemo />
      </section>
      {/* </ScrollArea> */}
    </>
  )
}

export default TodayPage
