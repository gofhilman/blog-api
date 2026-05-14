import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./ui/popover";

export default function CommentNotification({ comments }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="px-2.5">
          <div className="flex gap-1">
            <Bell strokeWidth={2.5} />
            {comments.length > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[0.625rem] font-semibold leading-none text-primary-foreground">
                {comments.length}
              </span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>
          <PopoverTitle></PopoverTitle>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
