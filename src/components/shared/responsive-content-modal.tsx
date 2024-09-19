"use client"

import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"

import { Dialog, DialogContent } from "../ui/dialog"
import {
  EnhancedDrawer,
  EnhancedDrawerClose,
  EnhancedDrawerContent,
} from "./enhanced-drawer"

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root> & {
  drawerHeight?: string
  drawerContentClassName?: string
}

type DialogProps = {
  dialogContentClassName?: string
}

type ModalProps = DrawerProps &
  DialogProps & {
    title?: string
    isOpen: boolean
    children: React.ReactNode
    withDefaultDialogClose?: boolean
    onChange: (open: boolean) => void
  }

export default function ResponsiveContentModal({
  title,
  isOpen,
  nested,
  children,
  onChange,
  drawerHeight,
  withDefaultDialogClose,
  drawerContentClassName,
  dialogContentClassName,
  ...props
}: ModalProps) {
  const { isMobile } = useMediaQuery()

  if (isMobile && !nested) {
    return (
      <EnhancedDrawer isOpen={isOpen} onOpenChange={onChange} {...props}>
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

  if (isMobile && nested) {
    return (
      <EnhancedDrawer
        isOpen={isOpen}
        onOpenChange={onChange}
        nested={nested}
        {...props}
      >
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
        withDefaultClose={withDefaultDialogClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(dialogContentClassName)}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
