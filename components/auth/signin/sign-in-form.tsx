"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "@/server/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

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
  const closeAccountModal = useAccountModal((state) => state.closeModal)

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
        router.refresh()
        queryClient.invalidateQueries({
          queryKey: ["profile"],
          exact: true,
        })
        closeAccountModal()
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
          onSubmit={form.handleSubmit(onSubmitSignin)}
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
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputBorderSpotlight
                    placeholder="password"
                    {...field}
                    type="password"
                    onChange={field.onChange}
                  />
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
