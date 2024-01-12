import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { toast } from "sonner"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUpWithEmailAndPassword } from "@/app/signin/actions"

import { InputBorderSpotlight } from "../shared/InputBorderSpotlight"

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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  })

  async function onSubmit(signUpData: z.infer<typeof FormSchema>) {
    //server action of signUpWithEmailAndPassword
    const result = await signUpWithEmailAndPassword(signUpData)

    const { data, error } = JSON.parse(result)

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
        toast.error("Error registering!", {
          description: <p>{error.message}</p>,
        })
      }
    } else {
      toast.success("Successfully registered!", {
        description: <p> Welcome {data}</p>,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                {/* <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                /> */}
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
                {/* <Input
                  placeholder="password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                /> */}
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
                {/* <Input
                  placeholder="Confirm Password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                /> */}
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
        <Button type="submit" className="flex w-full gap-2">
          Register
          <AiOutlineLoading3Quarters className={cn("animate-spin")} />
        </Button>
      </form>
    </Form>
  )
}
