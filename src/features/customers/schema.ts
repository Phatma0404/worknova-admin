import { z } from 'zod'

export const customerSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.email('Enter a valid email address.'),
  phone: z.string().min(1, 'Phone number is required.'),
  company: z.string().min(1, 'Company is required.'),
  jobTitle: z.string().optional(),
  status: z.enum(['active', 'pending', 'blocked']),
  notes: z.string().optional(),
})

export type CustomerFormValues = z.infer<typeof customerSchema>
