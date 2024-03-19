"use client"

import { useTransition } from "react"
import { signUpWithEmailAndPassword } from "@/server/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RingLoader } from "react-spinners"
import { toast } from "sonner"
import * as z from "zod"

import { cn } from "@/lib/utils"
import useAccountModal from "@/hooks/use-account-modal-store"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { InputBorderSpotlight } from "../../shared/InputBorderSpotlight"

const FormSchema = z
  .object({
    email: z.string().email(),
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
  const CloseModal = useAccountModal((state) => state.CloseModal)

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
      const { data, error } = await signUpWithEmailAndPassword(signUpData)

      if (error?.message) {
        if (
          error.name === "AuthApiError" &&
          error.message === "Email rate limit exceeded" &&
          error.status === 429
        ) {
          // Display a user-friendly message to inform the user about the email rate limit issue
          toast.error(
            "Sorry, we are currently experiencing issues with email delivery. Please try again later."
          )
        } else {
          toast.error("Error Registering!", {
            description: error.message,
          })
        }
      } else {
        CloseModal()
        toast.success("Successfully Registered!", {
          description: "Welcome " + data?.user?.email,
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
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <InputBorderSpotlight
                  placeholder="Confirm Password"
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
          className="flex w-full gap-2"
          disabled={isPending}
        >
          Register
          {isPending && (
            <span>
              <RingLoader size={15} speedMultiplier={1.5} color="gray" />
            </span>
          )}
        </Button>
      </form>
    </Form>
  )
}
