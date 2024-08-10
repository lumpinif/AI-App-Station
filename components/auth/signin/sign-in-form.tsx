"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signInWithEmailAndPassword } from "@/server/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { LOGIN_REDIRECT_PATH } from "@/lib/constants/site-constants"
import useAccountModal from "@/hooks/use-account-modal-store"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SpinnerButton } from "@/components/shared/spinner-button"

import { InputBorderSpotlight } from "../../shared/InputBorderSpotlight"

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

export default function SignInForm() {
  const [isPending, startTransition] = useTransition()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const closeAccountModal = useAccountModal((state) => state.closeModal)

  const params = useSearchParams()
  const next = params.get("next") || LOGIN_REDIRECT_PATH

  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmitSignin(signInData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { data, error } = await signInWithEmailAndPassword(signInData)

      if (error?.message) {
        if (
          error.name === "AuthApiError" &&
          error.message === "Invalid login credentials" &&
          error.status === 400
        ) {
          toast.error("Wrong email or password. Please try again.")
        } else {
          toast.error("Failed to Sign In!", {
            description: error.message,
          })
        }

        return
      }

      if (data?.user?.email) {
        queryClient.invalidateQueries({
          queryKey: ["profile"],
          exact: true,
        })
        closeAccountModal()
        router.push(next)
        toast.success("Successfully Signed In!", {
          description: "Welcome back " + data?.user?.email,
        })
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form
          className="w-full space-y-6"
          onSubmit={form.handleSubmit(onSubmitSignin)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputBorderSpotlight
                    placeholder="example@gmail.com"
                    {...field}
                    type="email"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputBorderSpotlight
                    {...field}
                    className="pr-8"
                    placeholder="password"
                    onChange={field.onChange}
                    type={!isShowPassword ? "password" : "text"}
                  >
                    <button
                      type="button"
                      onClick={() => setIsShowPassword(!isShowPassword)}
                      className="absolute right-2 my-auto h-full text-nowrap text-muted transition-all duration-150 hover:text-muted-foreground"
                    >
                      {isShowPassword ? (
                        <>
                          <Eye className="size-4 stroke-1" />
                          <p className="sr-only">show password</p>
                        </>
                      ) : (
                        <>
                          <EyeOff className="size-4 stroke-1" />
                          <p className="sr-only">show password</p>
                        </>
                      )}
                    </button>
                  </InputBorderSpotlight>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SpinnerButton
            type="submit"
            isLoading={isPending}
            className="w-full rounded-full"
          >
            Sign In
          </SpinnerButton>
        </form>
      </Form>
    </>
  )
}
