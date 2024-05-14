"use client"

import { useState } from "react"
import { SquarePen } from "lucide-react"

import { Apps } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { IntroductionFormTextarea } from "./description-form-textarea"

type DescriptionFormProps = {
  app_id: Apps["app_id"]
  description: Apps["description"]
}

const DescriptionForm = ({ description, app_id }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing((current) => !current)
  }

  return (
    <section className="min-h-0 w-full">
      {!isEditing ? (
        <div className={cn("group flex items-center justify-start gap-x-2")}>
          <span
            className={cn(
              "text-muted-foreground line-clamp-2 cursor-default text-sm hover:cursor-pointer md:line-clamp-3 md:text-base",
              !description && "text-muted-foreground italic"
            )}
            onClick={() => setIsEditing(true)}
          >
            {description || "Add some description here"}
          </span>
          <Button
            onClick={toggleEdit}
            variant="ghost"
            className="group"
            size={"xs"}
          >
            <SquarePen className="text-muted-foreground group-hover:text-foreground h-4 w-4 opacity-50 transition-opacity duration-300 ease-out group-hover:opacity-100" />
          </Button>
        </div>
      ) : (
        <IntroductionFormTextarea
          description={description}
          app_id={app_id}
          setIsEditing={setIsEditing}
        />
      )}
    </section>
  )
}

export default DescriptionForm
