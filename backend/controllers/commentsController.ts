import { prisma } from "../lib/prisma";

async function unreadCommentsGet(req: any, res: any) {
  const unreadComments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    where: { read: false },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      content: true,
      post: {
        select: {
          title: true,
          uri: true,
        },
      },
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  res.json({ comments: unreadComments });
}

export { unreadCommentsGet };
