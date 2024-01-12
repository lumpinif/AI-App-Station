import { NextResponse, type NextRequest } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

/**
 * Middleware function that handles cookies and authentication for requests.
 * This middleware is necessary to handle cookies and authentication for incoming requests. It provides methods to get, set, and remove cookies, allowing for cookie-based authentication and data storage.
 * When using the Supabase client on the server, you must perform extra steps to ensure the user's auth session remains active. Since the user's session is tracked in a cookie, we need to read this cookie and update it if necessary.
 * Next.js Server Components allow you to read a cookie but not write back to it. Middleware on the other hand allow you to both read and write to cookies.
 * @param request - The incoming request object.
 * @returns The response object.
 */

export async function middleware(request: NextRequest) {
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
        /**
         * Get the value of a cookie by name.
         * @param name - The name of the cookie.
         * @returns The value of the cookie, or undefined if not found.
         */
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        /**
         * Set a cookie with the given name, value, and options.
         * @param name - The name of the cookie.
         * @param value - The value of the cookie.
         * @param options - The options for the cookie.
         */
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
        /**
         * Remove a cookie with the given name and options.
         * @param name - The name of the cookie.
         * @param options - The options for the cookie.
         */
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

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
