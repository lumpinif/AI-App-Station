import { BentoGridDemo } from "@/components/today/bento-grid-demo"
import { BentoGridSecondDemo } from "@/components/today/bento-grid-second-demo"
import { getUserSession } from "@/app/(auth)/auth-actions"

const TodayPage = async () => {
  return (
    <>
      {/* <BentoGridDemo session={session} /> */}
      <BentoGridSecondDemo />
    </>
  )
}

export default TodayPage
