import Link from "next/link"

import { Button } from "@/components/ui/button"

const AIAppsPage = async () => {
  return (
    <div className="flex h-full items-center">
      <Link href={"/ai-apps/submit"} className="hover:underline">
        Submit
      </Link>
    </div>
  )
}

export default AIAppsPage
