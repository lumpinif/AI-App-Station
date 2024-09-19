"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "@/server/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { LOGIN_REDIRECT_PATH } from "@/lib/constants/site-constants"
import { getSiteUrl } from "@/lib/utils"
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

const FormSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(1, {
        message: "Email is required.",
      })
      .max(255, {
        message: "Email must not be longer than 255 characters.",
      }),
    password: z.string().min(6, {
      message: "Password is required.",
    }),
    confirm: z.string().min(6, {
      message: "Password is required.",
    }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Passwords did not match",
    path: ["confirm"],
  })

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const closeAccountModal = useAccountModal((state) => state.closeModal)

  const params = useSearchParams()
  const next = params.get("next") || LOGIN_REDIRECT_PATH
  const redirectPath = getSiteUrl() + next

  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  })

  function onSubmitRegisterForm(signUpData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      //server action of signUpWithEmailAndPassword
      const { data, error: signUpError } = await signUpWithEmailAndPassword(
        signUpData,
        redirectPath
      )

      if (signUpError?.name || signUpError?.message || signUpError?.status) {
        if (
          (signUpError.name === "AuthApiSignUpError" ||
            signUpError.name === "AuthApiError") &&
          signUpError.message === "Email rate limit exceeded" &&
          signUpError.status === 429
        ) {
          // Display a user-friendly message to inform the user about the email rate limit issue
          toast.error(
            "Sorry, we are currently experiencing issues with email delivery. Please try again later."
          )
        } else if (
          signUpError.name === "AuthApiError" &&
          signUpError.message === "User already registered" &&
          signUpError.status === 422
        ) {
          const reSignInProcess = async (
            signUpData: z.infer<typeof FormSchema>
          ) => {
            const signInData = {
              email: signUpData.email,
              password: signUpData.password,
            }

            const { data: signedInExistUser, error: signInError } =
              await signInWithEmailAndPassword(signInData)

            if (signInError) {
              throw new Error(signInError.message)
            }

            if (!signedInExistUser.session?.user.id) {
              throw new Error("Failed to sign in existing user")
            }

            return signedInExistUser
          }

          toast.promise(reSignInProcess(signUpData), {
            loading: "Signing in existing user...",
            success: (signedInExistUser) => {
              queryClient.invalidateQueries({
                queryKey: ["profile"],
                exact: true,
              })
              closeAccountModal()
              router.push(next)
              return `${signedInExistUser.session?.user.email} successfully signed in!`
            },
            error: (error) => {
              return error || "Failed to sign in existing user"
            },
          })
        } else {
          toast.error("Error Registering!", {
            description: signUpError.name + signUpError.message,
          })
        }
      } else {
        //TODO: CURRENTLY HAVE BUG WITH THE EXISITING USER SIGN UP

        queryClient.invalidateQueries({
          queryKey: ["profile"],
          exact: true,
        })
        closeAccountModal()
        toast.success("Please confirm your email to sign in", {
          description: "Check " + data?.user?.email + " for confirmation email",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitRegisterForm)}
        className="w-full space-y-6"
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
        <FormField
          name="confirm"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <InputBorderSpotlight
                  {...field}
                  placeholder="Confirm Password"
                  onChange={field.onChange}
                  type={!isShowPassword ? "password" : "text"}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <SpinnerButton
          type="submit"
          isLoading={isPending}
          className="w-full rounded-md"
        >
          Register
        </SpinnerButton>
      </form>
    </Form>
  )
}
