import * as z from "zod";

// Define the event form schema with validation rules
export const eventFormSchema = z.object({
  title: z.string()
    .min(3, { message: 'Title must be at least 3 characters' }),
  
  description: z.string()
    .min(3, { message: 'Description must be at least 3 characters' })
    .max(400, { message: 'Description must be less than 400 characters' }),
  
  location: z.string()
    .min(3, { message: 'Location must be at least 3 characters' })
    .max(400, { message: 'Location must be less than 400 characters' }),
  
  imageUrl: z.string().url({ message: 'Invalid image URL' }),
  
  startDateTime: z.date({ message: 'Start date is required' }),
  
  endDateTime: z.date({ message: 'End date is required' }),
  
  categoryId: z.string().nonempty({ message: 'Category is required' }),
  
  price: z.string().optional(),
  
  isFree: z.boolean(),
  
  url: z.string().url({ message: 'Invalid URL' })
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
