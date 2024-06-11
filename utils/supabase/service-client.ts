import { createClient } from "@supabase/supabase-js"

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
) {
  throw new Error("Missing env vars SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
}

const privateServiceClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  )

export default privateServiceClient
