"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, OctagonAlertIcon } from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { SignUpSchema, TSignUp } from "@/modules/auth/schema/auth.schema";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { SocialSignIn } from "../Social-sign-in";

export const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
  });
  const signInSubmit = async (data: TSignUp) => {
    await authClient.signUp.email(
      {
        name: data?.email,
        email: data?.email,
        password: data?.password,
      },
      {
        onSuccess() {
          router.push("/");
        },
        onError(ctx) {
          setError(ctx?.error?.message);
        },
      },
    );
  };
  const isSubmitting = form.formState.isSubmitting;
  return (
    <form className="p-6 md:p-8" onSubmit={form.handleSubmit(signInSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Let&apos;s get started</h1>
          <p className="text-muted-foreground text-balance">
            Create your account
          </p>
        </div>

        <div className="grid gap3">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    id={"name"}
                    placeholder="Enter your name"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id={"email"}
                    placeholder="Enter your email"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter your password"
                    id={"password"}
                    type={"password"}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter your confirm password"
                    id={"confirmPassword"}
                    type={"password"}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>
        {error && (
          <Alert className="bg-destructive/10 border-none">
            <OctagonAlertIcon className="h-4 w-4 text-destructive!" />
            <AlertTitle className="text-destructive">{error}</AlertTitle>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <SocialSignIn />
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-blue-400 hover:underline hover:underline-offset-4"
          >
            SignIn
          </Link>
        </div>
      </div>
    </form>
  );
};
