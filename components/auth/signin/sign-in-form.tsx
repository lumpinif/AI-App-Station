"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RingLoader } from "react-spinners"
import { toast } from "sonner"
import * as z from "zod"

import useAuthModal from "@/hooks/use-auth-modal-store"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signInWithEmailAndPassword } from "@/app/(auth)/auth-actions"

import { InputBorderSpotlight } from "../../shared/InputBorderSpotlight"

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

export default function SignInForm() {
  const [isPending, startTransition] = useTransition()
  const CloseModal = useAuthModal((state) => state.CloseModal)

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
      } else {
        CloseModal()
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
          <Button
            type="submit"
            className="flex w-full gap-2 rounded-full"
            disabled={isPending}
          >
            Sign In
            {isPending && (
              <span>
                <RingLoader size={15} speedMultiplier={1.5} color="gray" />
              </span>
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}
