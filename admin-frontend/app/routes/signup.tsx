import { data, Form, redirect } from "react-router";
import FormErrors from "~/components/FormErrors";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/signup";
import { postSignup } from "~/api/authApi";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  try {
    await postSignup(user);
    return redirect("/");
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}

export default function Signup({ actionData }: Route.ComponentProps) {
  const errors = actionData?.errors;

  return (
    <main>
      <title>Sign Up &mdash; Stacked Control</title>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>Let's get started!</CardTitle>
          <CardDescription>
            Fill in your details to register and access your dashboard.
          </CardDescription>
          <CardAction>
            <Form action="/login" viewTransition>
              <Button variant="link">Log in</Button>
            </Form>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form
            id="signup"
            method="post"
            onSubmit={(event) => {
              const form = event.currentTarget;
              const password =
                form.querySelector<HTMLInputElement>("#password");
              const confirmPassword =
                form.querySelector<HTMLInputElement>("#confirm-password");
              if (confirmPassword) {
                confirmPassword.setCustomValidity("");
                if (confirmPassword.value !== password?.value) {
                  confirmPassword.setCustomValidity(
                    "Passwords must match, darling.",
                  );
                }
              }
              if (!form.reportValidity()) {
                event.preventDefault();
              }
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
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="admin-passcode">Admin passcode</Label>
                <Input
                  type="password"
                  id="admin-passcode"
                  name="admin-passcode"
                  required
                />
              </div>
              <Input type="hidden" name="role" value="ADMIN" />
            </div>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="signup" className="w-full">
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
