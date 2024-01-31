import Link from "next/link"

import { Button } from "@/components/ui/button"

const AIAppsPage = async () => {
  return (
    <div className="flex h-full items-center">
      <div className="">AI APPS</div>
      <Button>
        <Link href={"/ai-apps/submit"}>Submit</Link>
      </Button>
    </div>
  )
}

export default AIAppsPage
