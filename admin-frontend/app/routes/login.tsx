import { useFetcher } from "react-router";
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

export default function Login() {
  const fetcher = useFetcher();
  const errors = fetcher.data?.errors;

  return (
    <main>
      <title>Log In &mdash; Stacked Stories</title>
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
                <Input id="username" name="username" required></Input>
              </div>
              <div className="grid gap-2">
                <Label></Label>
                <Input></Input>
              </div>
            </div>
          </fetcher.Form>
        </CardContent>
        <CardFooter>
          <Button></Button>
          <Button></Button>
        </CardFooter>
      </Card>
    </main>
  );
}
