"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Label } from "../ui/label"
import EmailLoginForm from "./email-login-form"
import GithubLoginButton from "./github-login-button"
import GoogleLoginButton from "./google-login-button"
import OAuthForm from "./oauth-form"
import RegisterForm from "./register-form"
import SignInForm from "./sign-in-form"

const LoginCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className={cn("w-full rounded-2xl p-8", className)} {...props}>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6">
        {/* <UserAuthForm /> */}
        <AuthForm />
        <p className="text-center text-xs text-muted-foreground">
          By clicking, you agree to our{" "}
          <Link
            href="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default LoginCard

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
//   return (
//     <div className={cn("grid gap-6", className)} {...props}>
//       <GoogleLoginButton />
//       <GithubLoginButton />
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t" />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-background px-2 text-muted-foreground">
//             Or continue with Email
//           </span>
//         </div>
//       </div>
//       <div className="grid gap-2">
//         <div className="grid gap-1">
//           <Label className="sr-only" htmlFor="email">
//             Email
//           </Label>
//           <EmailLoginForm />
//         </div>
//       </div>
//     </div>
//   )
// }

export function AuthForm() {
  return (
    <div className="w-full space-y-6">
      <h1 className="text-center text-3xl font-semibold">
        Sign in to Continue
      </h1>
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <OAuthForm />
    </div>
  )
}
