import slugify from "@sindresorhus/slugify";
import { prisma } from "../lib/prisma";
import uriToId from "../lib/uriToId";
import { POSTS_PER_PAGE } from "./constants";

async function postsGet(req: any, res: any) {
  const page = +req.query.page || 1;
  const categoryUri = req.query.category;
  const posts = await prisma.post.findMany({
    skip: (page - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { username: true, role: true },
      },
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
      author: {
        select: { username: true, role: true },
      },
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
    include: {
      user: {
        select: { username: true, role: true },
      },
    },
  });
  res.json({ comments, userId: req.user.id });
}

async function postPost(req: any, res: any) {
  const { title, subtitle, published, content, categories } = req.body;
  const connectOrCreate = categories.map((name: any) => ({
    create: { name, uri: slugify(name) },
    where: { name },
  }));
  let post = await prisma.post.create({
    data: {
      title,
      subtitle,
      published,
      content,
      categories: { connectOrCreate },
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
  const connectOrCreate = categories.map((name: any) => ({
    create: { name, uri: slugify(name) },
    where: { name },
  }));
  const postId = uriToId(req.params.postUri);
  await prisma.post.update({
    where: { id: postId },
    data: { categories: { set: [] } },
  });
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      subtitle,
      published,
      content,
      categories: { connectOrCreate },
      authorId: req.user.id,
      uri: slugify(title) + "-" + postId,
      updatedAt: new Date(),
    },
  });
  await prisma.category.deleteMany({
    where: { posts: { none: {} } },
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

async function postPublishedPatch(req: any, res: any) {
  const post = await prisma.post.update({
    where: { uri: req.params.postUri },
    data: { published: req.body.published },
  });
  res.json({ post });
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
  postPublishedPatch,
  postDelete,
  commentDelete,
};
