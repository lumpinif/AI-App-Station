"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"

import { Label } from "../ui/label"
import EmailLoginForm from "./email-login-form"
import GithubLoginButton from "./github-login-button"
import GoogleLoginButton from "./google-login-button"

const LoginCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className={cn("w-full rounded-2xl p-8", className)} {...props}>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6">
        <h1 className="my-6 text-center text-3xl  font-semibold">
          Sign in to Continue
        </h1>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <GoogleLoginButton />
      <GithubLoginButton />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with Email
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <EmailLoginForm />
        </div>
      </div>
    </div>
  )
}
