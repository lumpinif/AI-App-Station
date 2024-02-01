import Link from "next/link"

import { Button } from "@/components/ui/button"

const AIAppsPage = async () => {
  return (
    <div className="flex items-center">
      <Link href={"/ai-apps/submit"} className="hover:underline">
        <Button>Submit</Button>
      </Link>
    </div>
  )
}

export default AIAppsPage
