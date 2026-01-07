import getPostId from "../lib/getPostId";
import { prisma } from "../lib/prisma";

const POSTS_PER_PAGE = 10;

async function postsGet(req: any, res: any) {
  const page = +req.query.page || 1;
  const categoryUri = req.query.category;
  const categoryId =
    categoryUri && +categoryUri.split("-")[categoryUri.split("-").length - 1];
  const posts = await prisma.post.findMany({
    skip: (page - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      categories: true,
    },
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

async function specificPostGet(req: any, res: any) {
  const postId = getPostId(req.params.postUri);
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
      categories: true,
      // comments: true,
    },
  });
  res.json({ post });
}

async function commentsGet(req: any, res: any) {
  const postId = getPostId(req.params.postUri);
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "asc" },
    where: { postId },
  });
  res.json({ comments, userId: req?.user.id });
}

async function postPost(req: any, res: any) {
  const { title, subtitle, published, uri, content, categories } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      subtitle,
      published,
      uri,
      content,
      categories,
      authorId: req.user.id,
    },
  });
  res.json({ post });
}

async function commentPost(req: any, res: any) {
  const postId = getPostId(req.params.postUri);
  const comment = await prisma.comment.create({
    data: {
      postId,
      userId: req.user.id,
      content: req.body.content,
    },
  });
  res.json({ comment });
}

async function postPut(req: any, res: any) {
  const postId = getPostId(req.params.postUri);
  const { title, subtitle, published, uri, content, categories } = req.body;
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      subtitle,
      published,
      uri,
      content,
      categories,
      authorId: req.user.id,
      updatedAt: new Date(),
    },
  });
  res.json({ post });
}

async function commentPut(req: any, res: any) {
  const commentId = req.params.commentId;
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: { content: req.body.content },
  });
  res.json({ comment });
}

async function postDelete(req: any, res: any) {
  const postId = getPostId(req.params.postUri);
  const post = await prisma.post.delete({
    where: { id: postId },
  });
  await prisma.category.deleteMany({
    where: { posts: { none: {} } },
  });
  res.json({ post });
}

async function commentDelete(req: any, res: any) {
  const commentId = req.params.commentId;
  const comment = await prisma.comment.delete({
    where: { id: commentId },
  });
  res.json({ comment });
}

export {
  postsGet,
  specificPostGet,
  commentsGet,
  postPost,
  commentPost,
  postPut,
  commentPut,
  postDelete,
  commentDelete,
};
