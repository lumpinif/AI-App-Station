"use client"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"

import { Dialog, DialogContent } from "../ui/dialog"
import { Drawer, DrawerClose, DrawerContent } from "../ui/drawer"

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  title: string
  className?: string
  onChange: (open: boolean) => void
}

export default function Modal({
  children,
  isOpen,
  title,
  onChange,
  className,
}: ModalProps) {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onChange} shouldScaleBackground>
        <DrawerContent className={cn("h-[80%] outline-none", className)}>
          <div className="sticky inset-x-0 z-50 flex h-20 items-center justify-center text-lg font-medium">
            {title}
            <DrawerClose
              asChild
              className="absolute right-0 top-1/2 -translate-y-1/2 text-lg"
            >
              <button className="mr-4 w-min text-blue-500">Done</button>
            </DrawerClose>
          </div>
          <div className="flex-1 overflow-y-auto rounded-t-[10px]">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange} defaultOpen={isOpen}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="rounded-2xl outline-none"
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
