import { ArrowUpRight, Bell, Dot } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./ui/popover";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";
import { Link } from "react-router";
import formatTime from "~/lib/formatTime";

export default function CommentNotification({ comments }: any) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="px-2.5">
          <div className="flex gap-1">
            <Bell strokeWidth={2.5} />
            {comments.length > 0 && (
              <span className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full text-[0.625rem] leading-none font-semibold">
                {comments.length}
              </span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full max-w-sm">
        <PopoverHeader>
          <PopoverTitle>
            {comments.length > 0
              ? `You have ${comments.length} unread comment${comments.length > 1 ? "s" : ""}`
              : "No unread comments"}
          </PopoverTitle>
        </PopoverHeader>
        <div className="flex w-full flex-col gap-1 py-2">
          {comments.map(
            ({ id, createdAt, updatedAt, content, post, user }: any) => (
              <Item key={id} asChild>
                <Link
                  to={"/posts/" + post.uri + "/edit"}
                  onClick={() => setOpen(false)}
                >
                  <ItemContent>
                    <ItemTitle className="flex w-full justify-between">
                      <p>{user.username}</p>
                      <p>
                        {updatedAt
                          ? formatTime(updatedAt)
                          : formatTime(createdAt)}
                      </p>
                    </ItemTitle>
                    <ItemDescription className="line-clamp-1">
                      <span className="font-semibold">{post.title}</span>:{" "}
                      {content}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ArrowUpRight />
                  </ItemActions>
                </Link>
              </Item>
            ),
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
