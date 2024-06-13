import { isRedirectError } from "next/dist/client/components/redirect"
import { PostgrestError } from "@supabase/supabase-js"
import { toast } from "sonner"
import { z } from "zod"

// TODO: MOVE THIS TO SOMEWHERE ELSE
// TODO: CHECK ALL THE ERROR HANDLING BEFORE PRODUCTION
export function getErrorMessage(err: unknown | PostgrestError) {
  const unknownError = "Something went wrong, please try again later."

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return errors.join("\n")
  } else if (err instanceof Error) {
    return err.message
  } else if (isRedirectError(err)) {
    throw err
  } else if ((err as PostgrestError).message !== undefined) {
    return (err as PostgrestError).message
  } else {
    return unknownError
  }
}

// export function showErrorToast(err: unknown) {
//   const errorMessage = getErrorMessage(err)
//   return toast.error(errorMessage)
// }
