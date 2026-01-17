import { use } from "react";

export default function Comments({ commentsAndUser }: any) {
  const [comments, user]: any = use(commentsAndUser);
}
