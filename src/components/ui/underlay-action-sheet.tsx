"use client"

import { useState } from "react"
import {
  CaretSortIcon,
  Cross1Icon,
  HeartIcon,
  LockClosedIcon,
  MagicWandIcon,
  PlusIcon,
  Share1Icon,
} from "@radix-ui/react-icons"
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

const EXPANDED_HEIGHT = 700
const COLLAPSED_HEIGHT = 400
const TOGGLE_HEIGHT_THRESHOLD = (EXPANDED_HEIGHT + COLLAPSED_HEIGHT) / 2

const CaretSortIconMotion = motion(CaretSortIcon)

type UnderlayActionSheetProps = {
  children: React.ReactNode
}

export const UnderlayActionSheet = ({ children }: UnderlayActionSheetProps) => {
  const [hasOutline, setHasOutline] = useState(true)
  const contentHeight = useMotionValue(EXPANDED_HEIGHT)
  const contentAnimationControls = useAnimation()
  const heightTransitionSettings = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1],
  }
  const contentScale = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [1, 0.9]
  )
  const contentRoundedCorners = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [0, 24]
  )
  const contentPaddingTop = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [10, 0]
  )
  const actionAreaHeight = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [92, 20]
  )
  const actionButtonSize = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [28, 4]
  )
  const actionIconScale = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [1, 0]
  )
  const sheetShadowIntensity = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [
      "0 0px 0px 0px rgb(0 0 0 / 0.1), 0 0px 0px 0px rgb(0 0 0 / 0.1)",
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    ]
  )

  const onDragAdjustHeight = (_event: any, info: { delta: { y: number } }) => {
    let newHeight = contentHeight.get() + info.delta.y

    if (newHeight > COLLAPSED_HEIGHT && newHeight <= EXPANDED_HEIGHT) {
      contentHeight.set(newHeight)
    }
  }

  const onDragEndAdjustHeight = async () => {
    if (
      contentHeight.get() === COLLAPSED_HEIGHT ||
      contentHeight.get() === EXPANDED_HEIGHT
    ) {
      return
    }

    const finalHeight =
      contentHeight.get() < TOGGLE_HEIGHT_THRESHOLD
        ? COLLAPSED_HEIGHT
        : EXPANDED_HEIGHT
    await contentAnimationControls.start({
      height: finalHeight,
      transition: heightTransitionSettings,
    })
  }

  const openSheet = () => {
    if (contentHeight.get() === COLLAPSED_HEIGHT) {
      return
    }

    contentAnimationControls.start({
      height: COLLAPSED_HEIGHT,
      transition: heightTransitionSettings,
    })
  }

  const closeSheet = () => {
    contentAnimationControls.start({
      height: EXPANDED_HEIGHT,
      transition: heightTransitionSettings,
    })
  }

  const toggleOutline = () => {
    setHasOutline(!hasOutline)
  }

  const newLocal = "relative w-full overflow-hidden bg-background"
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div
          className={newLocal}
          style={{
            height: EXPANDED_HEIGHT,
            // outline: hasOutline ? "12px solid #000" : "none",
            // borderRadius: hasOutline ? "54px" : "4px",
            // width: "344px",
          }}
        >
          <div>
            <motion.div
              className="relative overflow-hidden bg-background"
              style={{
                height: contentHeight,
                scale: contentScale,
                borderRadius: contentRoundedCorners,
                boxShadow: sheetShadowIntensity,
              }}
              animate={contentAnimationControls}
            >
              <motion.div
                className="flex h-full flex-col space-y-2 overflow-y-scroll px-2 pb-14"
                style={{
                  // remove scrollbar for demo phone screen
                  scrollbarWidth: "none",
                  paddingTop: contentPaddingTop,
                }}
              >
                {/* Content */}
                {children}
              </motion.div>

              {/* Controller */}
              <motion.div
                className="absolute bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-background via-background to-transparent"
                style={{
                  height: actionAreaHeight,
                }}
                animate={contentAnimationControls}
              >
                <motion.div
                  drag="y"
                  dragConstraints={{
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                  dragElastic={0}
                  dragMomentum={false}
                  onDrag={onDragAdjustHeight}
                  onDragEnd={onDragEndAdjustHeight}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                  whileDrag={{ cursor: "grabbing" }}
                  className="flex h-4/5 w-full items-center justify-center"
                >
                  <motion.button
                    onClick={openSheet}
                    className="dark:glass-card-background z-10 flex items-center justify-center rounded-[12px] bg-muted px-2 text-muted-foreground transition-colors"
                    style={{
                      height: actionButtonSize,
                    }}
                    animate={contentAnimationControls}
                  >
                    <CaretSortIconMotion
                      className="h-8 w-8 "
                      style={{
                        scaleY: actionIconScale,
                      }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div className="flex flex-col space-y-2 px-4">
            <div className="flex items-center space-x-2 pb-5 pt-3">
              <div className="flex-1">
                <button className="dark:glass-card-background rounded-full bg-muted p-1 transition-colors">
                  <PlusIcon className="h-4 w-4 text-primary" />
                </button>
              </div>
              <div className="flex-1 text-center text-primary">Actions</div>
              <div className="flex flex-1 justify-end" onClick={closeSheet}>
                <button className="dark:glass-card-background rounded-full bg-muted p-1 transition-colors">
                  <Cross1Icon className="h-4 w-4 text-primary" />
                </button>
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="dark:glass-card-background flex flex-1 flex-col items-center justify-center space-y-1 rounded-xl bg-muted p-4 text-sm">
                <HeartIcon className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary">Like</span>
              </div>
              <div className="dark:glass-card-background flex flex-1 flex-col items-center justify-center space-y-1 rounded-xl bg-muted p-4 text-sm">
                <Share1Icon className="h-4 w-4 text-primary" />
                <span className="text-primary">Share</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="dark:glass-card-background flex items-center space-x-2 rounded-xl bg-muted p-4">
                <MagicWandIcon className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary">Regenerate</span>
              </div>
              <div className="dark:glass-card-background flex items-center space-x-2 rounded-xl bg-muted p-4 text-sm">
                <LockClosedIcon className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary">Lock</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
