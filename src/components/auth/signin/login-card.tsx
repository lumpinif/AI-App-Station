import Link from "next/link"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import OAuthForm from "./oauth-form"
import RegisterForm from "./register-form"
import SignInForm from "./sign-in-form"

type LoginCardProps = {
  children?: React.ReactNode
  className?: string
}

const LoginCard = ({ children, className }: LoginCardProps) => {
  return (
    <div className={cn("w-full p-8", className)}>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6">
        <AuthForm />
        <p className="text-balance text-center text-xs text-muted-foreground">
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
      {children}
    </div>
  )
}

export default LoginCard

export function AuthForm() {
  return (
    <div className="w-full space-y-6">
      <h1 className="text-center text-3xl font-semibold">
        Sign in to Continue
      </h1>
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2 bg-card">
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
