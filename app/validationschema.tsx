import { z } from "zod";

//validation schema
export const createissueschema = z.object({
  title: z.string().min(3, "This field is required").max(100),
  description: z.string().min(3, "This field is required").max(1000),
});
