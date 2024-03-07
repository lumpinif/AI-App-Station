"use client"

// interface StickyBarProps {
//   param: string
// }
import { usePathname } from "next/navigation"

const StickyBar = () => {
  const currentPath = usePathname()
  const path = currentPath.split("/").slice(1)
  const lastSegment = path.length - 1

  return (
    <>
      <div className="sticky left-0 right-0 top-0 hidden h-14 w-full bg-muted/50 backdrop-blur-sm sm:block">
        <div className="flex h-full items-center justify-center gap-x-2">
          {path.map((path, index) =>
            index === lastSegment ? (
              <span key={index}>{path}</span>
            ) : (
              <span className="flex gap-x-2">
                <span key={index}>{path}</span>
                <span>-</span>
              </span>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default StickyBar
