// import { useEffect } from "react"

// type useKeyPressProps = {
//   callback: (event: KeyboardEvent) => void
//   keyCodes: string[]
// }

// export function useKeyPress({ callback, keyCodes }: useKeyPressProps) {
//   useEffect(() => {
//     const handler = (event: KeyboardEvent) => {
//       if (keyCodes.includes(event.code)) {
//         callback(event)
//       }
//     }

//     window.addEventListener("keydown", handler)
//     return () => {
//       window.removeEventListener("keydown", handler)
//     }
//   }, [callback, keyCodes])
// }
