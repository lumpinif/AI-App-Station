import { NextResponse, type NextRequest } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    }
  )

  const { data } = await supabase.auth.getUser()

  const url = new URL(request.url)
  const nextUrl = url.searchParams.get("next") || "/today"

  if (data?.user) {
    // User is signed in
    if (url.pathname === "/signin" || url.pathname === "/signout") {
      return NextResponse.redirect(new URL(nextUrl, request.url))
    }
    return response
  } else {
    if (url.pathname === "/user") {
      return NextResponse.redirect(
        new URL("/signin?next=" + url.pathname, request.url)
      )
    }
    return response
  }

  // await supabase.auth.getUser()
  return response
}
