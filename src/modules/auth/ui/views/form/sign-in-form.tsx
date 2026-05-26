"use client";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, OctagonAlertIcon } from "lucide-react";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { SignInSchema, TSignIn } from "@/modules/auth/schema/auth.schema";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(SignInSchema),
  });
  const signInSubmit = (data: TSignIn) => {
    console.log("data", data);
  };
  const isSubmitting = form.formState.isSubmitting;
  return (
    <form className="p-6 md:p-8" onSubmit={form.handleSubmit(signInSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-balance">text-balance</p>
        </div>

        <div className="grid gap3">
          <FieldGroup>
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
                </Field>
              )}
            />
          </FieldGroup>
        </div>
        {true && (
          <Alert className="bg-destructive/10 border-none">
            <OctagonAlertIcon className="h-4 w-4 text-destructive!" />
            <AlertTitle className="text-destructive">Error</AlertTitle>
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
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" className="w-full">
            Google
          </Button>
          <Button variant="outline" type="button" className="w-full">
            Github
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-400 hover:underline hover:-underline-offset-4"
          >
            SignUp
          </Link>
        </div>
      </div>
    </form>
  );
};
