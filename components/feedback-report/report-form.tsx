import { usePathname, useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Report_type, Reports, TCommentWithProfile } from "@/types/db_tables"
import { cn, getSiteUrl } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"

import { SpinnerButton } from "../shared/spinner-button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

type ReportFormProps = {
  className?: string
  reportType: Report_type
  urlProp?: Reports["report_url"]
  comment?: TCommentWithProfile
}

const reportFormSchema = z.object({
  report_title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title must be less than 50 characters" }),

  description: z
    .string()
    .max(140, { message: "Description must be less than 140 characters" })
    .optional(),

  report_url: z.string().url({ message: "Invalid URL" }),
  // .regex(
  //   /^https:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
  //   {
  //     message: "Invalid URL. Make sure it starts with 'https://'",
  //   }
  // ),
})

export const ReportForm: React.FC<ReportFormProps> = ({
  urlProp,
  comment,
  className,
  reportType,
}) => {
  const { data: profile } = useUserProfile()
  const currentPath = usePathname()
  const router = useRouter()

  const report_url_with_comment = comment?.comment_id
    ? `#comment-${comment.comment_id}`
    : ""

  const reportUrl =
    !urlProp || urlProp === ""
      ? `${getSiteUrl()}${currentPath + report_url_with_comment}` ||
        `${window.location.origin}${currentPath + report_url_with_comment}`
      : urlProp

  const report_description_with_comment = comment?.comment_id
    ? `Reporting this comment: "${comment.comment}"`
    : ""

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      report_title: "",
      description: report_description_with_comment,
      report_url: reportUrl,
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async ({
    report_url: form_report_url,
    description: form_description,
    report_title: form_report_title,
  }: z.infer<typeof reportFormSchema>) => {
    if (!profile?.user_id) {
      return toast.error("Please sign in to submit a feedback or report.")
    }

    const supabase = createSupabaseBrowserClient()

    const { error } = await supabase.from("reports").insert([
      {
        report_type: reportType,
        report_url: form_report_url,
        report_description: report_description_with_comment + form_description,
        report_title: form_report_title,
        submitted_by_user_id: profile?.user_id,
      },
    ])

    if (error) {
      toast.error("Error submitting report, please try again later")
      return
    }

    toast.success("Thank you for reporting. We will look into it ASAP.", {
      closeButton: false,
    })

    form.reset()
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("my-4 space-y-8", className)}
        >
          <FormField
            control={form.control}
            name="report_title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="page-title-font text-base">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-card/10 outline-none focus-within:bg-card focus:ring-0 focus:!ring-transparent"
                    placeholder={
                      reportType === "feedback"
                        ? "What did you like about this website? What could be better?"
                        : "what is the problem?"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="page-title-font text-base">
                  Description (optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="border-0 bg-card/10 outline-none focus-within:bg-card focus:ring-0 focus:!ring-transparent"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide a clear and concise description of what the
                  problem is.
                </FormDescription>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="report_url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="page-title-font text-base">
                  {reportType === "feedback" ? "Url" : "Report Url"}
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-card/10 outline-none focus-within:bg-card focus:ring-0 focus:!ring-transparent"
                    placeholder="https://aiappstation.com/ai-apps/omg"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide a link to the page where the problem is
                  occurring.
                </FormDescription>

                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          <SpinnerButton
            type="submit"
            disabled={!isValid}
            isLoading={isSubmitting}
            className="w-full"
          >
            Submit
          </SpinnerButton>
        </form>
      </Form>
    </>
  )
}
