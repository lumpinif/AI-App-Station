import { useRef, useState } from "react"
import { UpdateAppByUrl } from "@/server/data/supabase-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, SquarePen, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useClickOutside from "@/hooks/use-click-out-side"
import { Separator } from "@/components/ui/separator"

import { InfoPopover } from "./info-modal"

type AppCopyRightFormProps = {
  app_id: App["app_id"]
  copy_right: App["copy_right"]
}

const formSchema = z.object({
  copy_right: z.string().min(1, { message: "Copy right is required" }),
})

export const AppCopyRightForm: React.FC<AppCopyRightFormProps> = ({
  app_id,
  copy_right,
}) => {
  return (
    <section className="w-full flex-col space-y-2 sm:space-y-4">
      <span className="flex items-center space-x-2">
        <h1 className="w-fit select-none text-2xl font-semibold">
          Add Copy Right
        </h1>
        <InfoPopover>
          <div className="px-2">
            <h3>Copy Right Form</h3>
            <Separator />

            {/* <ul className="text-muted-foreground my-2 flex w-full flex-col space-y-2">
            <li className="flex items-center space-x-4">
              <Plus className="size-4" />
              <span className="w-full">
                Click + to add or create developers
              </span>
            </li>
            <li className="flex items-center space-x-4">
              <Tags className="size-4" />
              <span className="w-full">
                You can select more than one developers
              </span>
            </li>
            <li className="flex items-center space-x-4">
              <Search className="size-4" />
              <span className="w-full">
                Search for developers in the database
              </span>
            </li>
          </ul>

          <h3 className="flex items-center space-x-2">
            <Info className="size-4" />
            <span>Key Info</span>
          </h3>
          <Separator />
          <ul className="text-muted-foreground mt-2">
            <li>
              {" "}
              - Max <span className="text-primary font-medium">5</span>{" "}
              developers can be selected
            </li>
            <li>
              -{" "}
              <span className="text-primary font-medium">Not allowed</span>{" "}
              to create{" "}
              <span className="text-primary font-medium">duplicate</span>{" "}
              developers
            </li>
            <li> - Press ✓ to save the selection</li>
            <li> - Avoid selecting unrelated developers</li>
            <li> - Please be responsible for your submission</li>
          </ul> */}
          </div>
        </InfoPopover>
      </span>
    </section>
  )
}
