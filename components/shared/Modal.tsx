"use client"

import useMediaQuery from "@/hooks/use-media-query"
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer"

import { Dialog, DialogContent } from "../ui/dialog"

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onChange: (open: boolean) => void
}

export default function Modal({ children, isOpen, onChange }: ModalProps) {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onChange} shouldScaleBackground>
        <DrawerContent className="h-[90%] outline-none">
          <div className="sticky inset-x-0 z-50 flex h-20 items-center justify-center text-lg font-medium">
            Account
            <DrawerClose
              asChild
              className="absolute right-0 top-1/2 -translate-y-1/2 text-lg"
            >
              <button className="mr-4 w-min text-blue-500">Done</button>
            </DrawerClose>
          </div>
          <div className="flex-1 items-center justify-center overflow-y-auto rounded-t-[10px]">
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
        className="rounded-2xl"
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
