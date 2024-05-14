import * as z from "zod"

export const AppsPageSearchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
  c_order: z.enum(["asc", "desc"]).optional(),
  orderBy: z.string().optional(),
})
