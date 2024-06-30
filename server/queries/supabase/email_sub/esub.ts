"use server"

import { cookies } from "next/headers"
import createSupabaseServerClient from "@/utils/supabase/server-client"
import * as z from "zod"

import { emailSubFormSchema } from "@/components/layout/site-footer/email-subscribe-form"

const RATE_LIMIT_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds
const MAX_SUBMISSIONS = 3

export async function insertEmailSub(
  email: z.infer<typeof emailSubFormSchema>
) {
  const supabase = await createSupabaseServerClient()

  // // Check rate limit
  // const cookieStore = cookies()
  // const submissionCountCookie = cookieStore.get("emailSubCount")
  // const lastSubmitTimeCookie = cookieStore.get("lastEmailSubSubmit")
  // const currentTime = Date.now()

  const { data: subEmail, error: insertSubError } = await supabase
    .from("email_subscriptions")
    .insert([{ email: email.email }])
    .select("email")

  if (insertSubError) {
    return { insertSubError }
  }

  return { subEmail, insertSubError }
}
