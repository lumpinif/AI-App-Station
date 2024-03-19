"use client"

import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const CardModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const onChange = (open: boolean) => {
    if (!open) router.back()
  }

  return (
    <>
      <Dialog open={true} onOpenChange={onChange}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="h-[90%] w-[95%] overflow-hidden rounded-lg outline-none"
        >
          <ScrollArea className="h-full w-full rounded-lg">
            {children}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CardModal
