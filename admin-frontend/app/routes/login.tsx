import { data, Form, redirect, useFetcher } from "react-router";
import FetcherErrors from "~/components/FetcherErrors";
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

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  try {
    await postLogin(user);
    return redirect("/");
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}

export default function Login() {
  const fetcher = useFetcher();
  const errors = fetcher.data?.errors;

  return (
    <main>
      <title>Log In &mdash; Stacked Control</title>
      <Card>
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription>
            Enter your credentials to log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fetcher.Form id="login" method="post">
            <FetcherErrors errors={errors} />
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
          </fetcher.Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login" className="w-full">
            Log in
          </Button>
          <Form action="/signup" className="w-full">
            <Button variant="outline" className="w-full">
              Sign up
            </Button>
          </Form>
        </CardFooter>
      </Card>
    </main>
  );
}
