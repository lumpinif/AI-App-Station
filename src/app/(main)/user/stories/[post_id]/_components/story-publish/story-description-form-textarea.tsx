import { useEffect, useRef, useState } from "react"

import useMediaQuery from "@/hooks/use-media-query"
import { useAutosizeTextArea } from "@/components/ui/autosize-textarea"
import { Textarea, TextareaProps } from "@/components/ui/textarea"

type StoryDescriptionFormTextareaProps = TextareaProps & {
  isSubmitting?: boolean
  descriptionWatch: string | null
}

export const StoryDescriptionFormTextarea: React.FC<
  StoryDescriptionFormTextareaProps
> = ({ isSubmitting, descriptionWatch, ...props }) => {
  const [triggerAutoSize, setTriggerAutoSize] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { isMobile } = useMediaQuery()

  const maxH = isMobile ? 100 : 120

  useAutosizeTextArea({
    textAreaRef: textAreaRef?.current,
    triggerAutoSize: triggerAutoSize,
    minHeight: 15,
    maxHeight: maxH,
  })

  useEffect(() => {
    if (textAreaRef.current && descriptionWatch) {
      setTriggerAutoSize(descriptionWatch)
    }
  }, [descriptionWatch])

  return (
    <Textarea
      ref={textAreaRef}
      disabled={isSubmitting}
      placeholder="This story is about..."
      className="no-scrollbar w-full rounded-none border-l-0 border-r-0 border-t-0 bg-transparent p-0 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-base"
      {...props}
    />
  )
}
