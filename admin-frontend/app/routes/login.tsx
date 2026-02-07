import { data, Form, redirect, useSubmit } from "react-router";
import FormErrors from "~/components/FormErrors";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/login";
import { postLogin } from "~/api/authApi";
import { useRef } from "react";
import { toast } from "sonner";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  try {
    await postLogin(user);
    return redirect(`/?id=${user.toastId}`);
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}

export default function Login({ actionData }: Route.ComponentProps) {
  const errors = actionData?.errors;
  const loadingToast = useRef<any>(null);
  const submit = useSubmit();

  if (errors) {
    const id = loadingToast.current;
    if (id) {
      loadingToast.current = null;
      toast.error("Failed to log in", { id });
    }
  }

  return (
    <main>
      <title>Log In &mdash; Stacked Control</title>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription>
            Enter your credentials to log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            id="login"
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
              const id = toast.loading("Logging in...");
              loadingToast.current = id;
              const formData: any = new FormData(event.currentTarget);
              formData.set("toastId", id);
              submit(formData, { method: "post" });
            }}
            viewTransition
          >
            <FormErrors errors={errors} />
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" required />
              </div>
            </div>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login" className="w-full">
            Log in
          </Button>
          <Form action="/signup" className="w-full" viewTransition>
            <Button variant="outline" className="w-full">
              Sign up
            </Button>
          </Form>
          <p>or</p>
          <Form
            action="/login-guest"
            method="post"
            className="w-full"
            onSubmit={(event) => {
              event.preventDefault();
              const id = toast.loading("Logging in...");
              loadingToast.current = id;
              const formData: any = new FormData(event.currentTarget);
              formData.set("toastId", id);
              submit(formData, { action: "/login-guest", method: "post" });
            }}
            viewTransition
          >
            <Input type="hidden" name="username" value="glam_guest" />
            <Input type="hidden" name="password" value="StrutInStyle123" />
            <Button className="w-full">Log in as a guest</Button>
          </Form>
        </CardFooter>
      </Card>
    </main>
  );
}
