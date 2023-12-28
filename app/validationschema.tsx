import { z } from "zod";

//validation schema
export const issueschema = z.object({
  title: z.string().min(3, "This field is required").max(100),
  description: z.string().min(3, "This field is required").max(1000),
});
export const Patchissueschema = z.object({
  title: z.string().min(3, "This field is required").max(100).optional(),
  description: z.string().min(3, "This field is required").max(1000).optional(),
  assignToUserId: z
    .string()
    .min(3, "Assigned to user id  is required")
    .max(100)
    .optional()
    .nullable(),
});
