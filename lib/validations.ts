import * as z from "zod"

export const appsSearchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  app_title: z.string().optional(),
  app_publish_status: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const postsSearchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  post_title: z.string().optional(),
  post_publish_status: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const mutiSelectorOptionSchema = z.object({
  label: z.string().max(25, { message: "Label is 25 Chars Max." }),
  value: z.string().max(25, { message: "Value is 25 Chars Max." }),
  id: z.string().optional(),
  // disable: z.boolean().optional(),
})
