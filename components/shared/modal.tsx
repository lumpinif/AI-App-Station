"use client"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"

import { Dialog, DialogContent } from "../ui/dialog"
import { Drawer, DrawerClose, DrawerContent } from "../ui/drawer"
import {
  EnhancedDrawer,
  EnhancedDrawerClose,
  EnhancedDrawerContent,
} from "./enhanced-drawer"

type DrawerProps = {
  drawerHeight?: string
  drawerContentClassName?: string
}

type DialogProps = {
  dialogContentClassName?: string
}

type ModalProps = DrawerProps &
  DialogProps & {
    children: React.ReactNode
    isOpen: boolean
    title?: string
    onChange: (open: boolean) => void
  }

export default function Modal({
  children,
  isOpen,
  title,
  onChange,
  drawerContentClassName,
  dialogContentClassName,
  drawerHeight,
}: ModalProps) {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <EnhancedDrawer isOpen={isOpen} onOpenChange={onChange}>
        <EnhancedDrawerContent
          className={drawerContentClassName}
          drawerHeight={drawerHeight}
        >
          <EnhancedDrawerClose title={title} />
          {children}
        </EnhancedDrawerContent>
      </EnhancedDrawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange} defaultOpen={isOpen}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className={cn(dialogContentClassName)}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
