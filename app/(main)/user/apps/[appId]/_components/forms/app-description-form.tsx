"use client"

import { useState } from "react"
import { SquarePen } from "lucide-react"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { IntroductionFormTextarea } from "./description-form-textarea"

type DescriptionFormProps = {
  app_id: App["app_id"]
  description: App["description"]
}

const DescriptionForm = ({ description, app_id }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing((current) => !current)
  }

  return (
    <section className="min-h-0 w-full">
      {!isEditing ? (
        <div className={cn("group flex items-center justify-start space-x-2")}>
          <span
            className={cn(
              "line-clamp-3 cursor-default text-sm text-muted-foreground hover:cursor-pointer md:line-clamp-3 md:text-base",
              !description && "italic text-muted-foreground"
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
            <SquarePen className="h-4 w-4 text-muted-foreground opacity-50 transition-opacity duration-300 ease-out group-hover:text-foreground group-hover:opacity-100" />
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
