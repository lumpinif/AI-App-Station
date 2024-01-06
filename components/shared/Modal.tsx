"use client"

import useMediaQuery from "@/hooks/use-media-query"
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer"

import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"

export default function Modal({
  children,
  className,
  isOpen,
  onChange,
}: {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onChange: (open: boolean) => void
}) {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onChange} shouldScaleBackground>
        <DrawerContent className="h-[93%]">
          <div className="sticky inset-x-0 z-50 flex h-20 items-center justify-center text-lg font-medium">
            Account
            <div className="">
              {/* TODO: Refactor this className issue */}
              <DrawerClose
                asChild
                className="absolute right-0 top-1/2 -translate-y-1/2 text-lg"
              >
                <Button variant="ghost" className="w-min text-blue-500">
                  Done
                </Button>
              </DrawerClose>
            </div>
          </div>
          <div className="flex h-full flex-col items-center justify-center">
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
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
