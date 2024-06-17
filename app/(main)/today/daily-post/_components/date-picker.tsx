"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Posts } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import BackButton from "@/components/shared/back-button"

type DatePickerProps = {
  currentDate: Date
  post_title: Posts["post_title"]
}

export function DatePicker({ post_title, currentDate }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>(currentDate)

  const router = useRouter()

  // Update route
  React.useEffect(() => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd")
      router.replace(`${formattedDate}`, {
        scroll: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between">
      <BackButton />

      {/* <span className="text-base font-semibold tracking-[-.016em] text-muted-foreground md:tracking-[-.024em]">
        {format(currentDate, "EEEE MMMM dd")}
      </span> */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size={"label"}
            variant={"ghost"}
            className={cn(
              "page-title-font w-fit justify-start text-left text-base font-semibold text-muted-foreground hover:text-primary active:scale-[.98] data-[state=open]:bg-accent data-[state=open]:text-primary",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              <span>{format(date, "PPP")}</span>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          sideOffset={10}
          className="w-auto bg-background/85 p-2 backdrop-blur-xl dark:border-0 dark:shadow-outline"
        >
          <Calendar
            mode="single"
            required={true}
            selected={date}
            onSelect={(day) => {
              if (day) {
                setDate(day)
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
