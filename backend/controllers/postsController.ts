import slugify from "@sindresorhus/slugify";
import { prisma } from "../lib/prisma";
import uriToId from "../lib/uriToId";

const POSTS_PER_PAGE = 10;

async function postsGet(req: any, res: any) {
  const page = +req.query.page || 1;
  const categoryUri = req.query.category;
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
          some: { uri: categoryUri },
        },
      },
    }),
  });
  res.json({ posts });
}

async function specificPostGet(req: any, res: any) {
  const post = await prisma.post.findUnique({
    where: {
      uri: req.params.postUri,
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
  const postId = uriToId(req.params.postUri);
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "asc" },
    where: { postId },
  });
  res.json({ comments, userId: req?.user.id });
}

async function postPost(req: any, res: any) {
  const { title, subtitle, published, content, categories } = req.body;
  let post = await prisma.post.create({
    data: {
      title,
      subtitle,
      published,
      content,
      categories,
      authorId: req.user.id,
    },
  });
  post = await prisma.post.update({
    where: { id: post.id },
    data: { uri: slugify(post.title) + "-" + post.id },
  });
  res.json({ post });
}

async function commentPost(req: any, res: any) {
  const postId = uriToId(req.params.postUri);
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
  const { title, subtitle, published, content, categories } = req.body;
  const postId = uriToId(req.params.postUri);
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      subtitle,
      published,
      content,
      categories,
      authorId: req.user.id,
      uri: slugify(title) + "-" + postId,
      updatedAt: new Date(),
    },
  });
  res.json({ post });
}

async function commentPut(req: any, res: any) {
  const comment = await prisma.comment.update({
    where: { id: req.params.commentId },
    data: { content: req.body.content },
  });
  res.json({ comment });
}

async function postDelete(req: any, res: any) {
  const post = await prisma.post.delete({
    where: { uri: req.params.postUri },
  });
  await prisma.category.deleteMany({
    where: { posts: { none: {} } },
  });
  res.json({ post });
}

async function commentDelete(req: any, res: any) {
  const comment = await prisma.comment.delete({
    where: { id: req.params.commentId },
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
