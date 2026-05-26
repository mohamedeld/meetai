import * as z from "zod";

export const SignInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type TSignIn = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    name: z.string({ message: "Name is required" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignUp = z.infer<typeof SignUpSchema>;
