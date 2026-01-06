import { prisma } from "../lib/prisma";

const POSTS_PER_PAGE = 10;

async function postsGet(req: any, res: any) {
  const page = +req.query.page || 1;
  const categoryUri = req.query.category;
  const categoryId =
    categoryUri && categoryUri.split("-")[categoryUri.split("-").length - 1];
  const posts = await prisma.post.findMany({
    skip: (page - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
    orderBy: { createdAt: "desc" },
    ...(categoryUri && {
      where: {
        categories: {
          some: { id: categoryId },
        },
      },
    }),
  });
  res.json({ posts });
}

async function specificPostGet(req: any, res: any) {}

async function commentsGet(req: any, res: any) {}

export { postsGet, specificPostGet, commentsGet };
