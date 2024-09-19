import { useEffect, useState } from "react"

export const useHash = () => {
  const [hash, setHash] = useState(
    typeof window !== "undefined" ? window.location.hash : ""
  )

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash)
    }
    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", onHashChange)
      return () => window.removeEventListener("hashchange", onHashChange)
    }
  }, [])

  return hash
}
