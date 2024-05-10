"use client"

import Link from "next/link"
// interface StickyBarProps {
//   param: string
// }
import { usePathname } from "next/navigation"

const StickyFloatingHeader = () => {
  const currentPath = usePathname()
  const path = currentPath.split("/").slice(1)
  const lastSegment = path.length - 1

  // TODO: TO BE CONTINUE DEVELOPING BEFORE PRODUCTION
  return (
    <>
      <div className="glass-card-background sticky inset-x-0 top-0 hidden h-14 w-full border-b text-sm font-semibold tracking-tight backdrop-blur-sm sm:block">
        <div className="line-clamp-2 flex h-full shrink-0 items-center justify-center gap-x-2">
          {path.map((path, index) =>
            index === lastSegment ? (
              <Link href={`/${path}`} key={index}>
                {path}
              </Link>
            ) : (
              <Link href={`/${path}`} className="flex gap-x-2">
                <span key={index}>{path}</span>
                <span>-</span>
              </Link>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default StickyFloatingHeader
