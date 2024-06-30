"use client"

import { useState, useTransition } from "react"
import { insertEmailSub } from "@/server/queries/supabase/email_sub/esub"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { InputBorderSpotlight } from "@/components/shared/InputBorderSpotlight"
import { SpinnerButton } from "@/components/shared/spinner-button"

type EmailSubscribeFormProps = {
  className?: string
}

export const emailSubFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, {
      message: "Email is required.",
    })
    .max(255, {
      message: "Email must not be longer than 255 characters.",
    }),
})

export const EmailSubscribeForm: React.FC<EmailSubscribeFormProps> = ({
  className,
}) => {
  const [isPending, startTransition] = useTransition()
  const [subButtonState, setSubButtonState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const [error, setError] = useState<string | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const form = useForm<z.infer<typeof emailSubFormSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(emailSubFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleEmailSub = (formData: z.infer<typeof emailSubFormSchema>) => {
    if (isSubscribed) return

    startTransition(async () => {
      const sub_email = formData.email

      if (subButtonState === "error") {
        setError(null)
        setSubButtonState("idle")
      }

      if (subButtonState === "loading") {
        return
      }

      try {
        setSubButtonState("loading")
        const { subEmail, insertSubError } = await insertEmailSub({
          email: sub_email,
        })

        if (insertSubError) {
          setError(insertSubError.message)
          if (
            insertSubError.code === "23505" ||
            insertSubError.message.includes(
              "duplicate key value violates unique constraint"
            )
          ) {
            setIsSubscribed(true)
            setSubButtonState("success")
            setError("You're already subscribed")
            return
          }

          setSubButtonState("error")
          throw new Error(insertSubError.message)
        }

        // Reset the subscribed status after 2 seconds
        setTimeout(() => {
          setSubButtonState("success")
        }, 2000)
        setIsSubscribed(true)
        form.reset()
      } catch (error) {
        setSubButtonState("error")
      } finally {
        if (subButtonState === "error") {
          setTimeout(() => {
            setSubButtonState("idle")
          }, 3000)
        }
      }
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (form.formState.errors.email || error) {
      setSubButtonState("idle")
      form.clearErrors("email")
      setError(null)
      setIsSubscribed(false)
      form.reset()
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEmailSub)}
          className="flex items-end gap-x-4"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {form.formState.errors.email?.message || error ? (
                  <FormLabel
                    className={cn(
                      error && "max-w-xs text-balance text-destructive"
                    )}
                  >
                    {form.formState.errors.email?.message}{" "}
                    {error && error.length > 30
                      ? `${error.substring(0, 30)}...`
                      : error}
                  </FormLabel>
                ) : (
                  <FormLabel className="text-muted-foreground">
                    Join our newsletter
                  </FormLabel>
                )}
                <FormControl>
                  <InputBorderSpotlight
                    type="email"
                    {...field}
                    placeholder="beff@jezos.ai"
                    onChange={(event) => {
                      field.onChange(event)
                      handleInputChange(event)
                    }}
                    className="dark:placeholder:text-muted"
                    disabled={isSubscribed}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <SpinnerButton
            withSuccess
            type="submit"
            buttonState={subButtonState}
            errorElement={"Please try again"}
            successElement={
              <div className="flex items-center gap-x-1">
                <CheckIcon className="size-4" />
                Subscribed
              </div>
            }
            className="w-36 font-medium"
            disabled={isSubscribed}
          >
            Subscribe
          </SpinnerButton>
        </form>

        <p className="max-w-sm text-xs text-muted-foreground dark:text-muted">
          By submitting your email address, you agree to receive AI App
          Station’s newsletters. For more information, please read our privacy
          policy or contact us at{" "}
          <p className="inline-block underline underline-offset-2 transition-all duration-300 ease-out hover:scale-102 hover:text-primary">
            support@aiappstation.com
          </p>
          .
        </p>
      </Form>
    </div>
  )
}
