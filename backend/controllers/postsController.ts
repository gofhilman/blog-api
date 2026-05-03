import slugify from "@sindresorhus/slugify";
import { prisma } from "../lib/prisma";
import uriToId from "../lib/uriToId";
import { POSTS_PER_PAGE } from "./constants";
import { AppError } from "../errors/AppError";

async function postsGet(req: any, res: any) {
  const page = req.query.page;
  const categoryUri = req.query.category;
  const published = req.query.published;
  const where = {
    ...(categoryUri && {
      categories: {
        some: { uri: categoryUri },
      },
    }),
    ...(published && { published: +published === 1 }),
  };
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      subtitle: true,
      published: true,
      uri: true,
      author: {
        select: { username: true, role: true },
      },
      categories: true,
    },
    ...(page && {
      skip: (+page - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    where,
  });
  const postCount = await prisma.post.count({ where });
  res.json({ posts, postCount });
}

async function specificPostGet(req: any, res: any) {
  const published = req.query.published;
  const post = await prisma.post.findUnique({
    where: {
      uri: req.params.postUri,
      ...(published && { published: +published === 1 }),
    },
    include: {
      author: {
        select: { username: true, role: true },
      },
      categories: true,
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
  res.json({ comments });
}

async function postPost(req: any, res: any) {
  const { title, subtitle, published, content, categories } = req.body;
  const createdAt = published ? new Date() : null;
  const connectOrCreate = categories.map((name: any) => ({
    create: { name },
    where: { name },
  }));
  let post = await prisma.post.create({
    data: {
      createdAt,
      title,
      subtitle,
      published,
      content,
      categories: { connectOrCreate },
      authorId: req.user.id,
    },
    include: { categories: true },
  });
  for (const category of post.categories) {
    if (!category.uri) {
      await prisma.category.update({
        where: { id: category.id },
        data: { uri: slugify(category.name) + "-" + category.id },
      });
    }
  }
  post = await prisma.post.update({
    where: { id: post.id },
    data: { uri: slugify(post.title) + "-" + post.id },
    include: { categories: true },
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
  let { createdAt, title, subtitle, published, content, categories } = req.body;
  createdAt = createdAt ? createdAt : published ? new Date() : null;
  const connectOrCreate = categories.map((name: any) => ({
    create: { name },
    where: { name },
  }));
  const postId = uriToId(req.params.postUri);
  await prisma.post.update({
    where: { id: postId },
    data: { categories: { set: [] } },
  });
  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      createdAt,
      title,
      subtitle,
      published,
      content,
      categories: { connectOrCreate },
      authorId: req.user.id,
      uri: slugify(title) + "-" + postId,
      updatedAt: new Date(),
    },
    include: { categories: true },
  });
  for (const category of updatedPost.categories) {
    if (!category.uri) {
      await prisma.category.update({
        where: { id: category.id },
        data: { uri: slugify(category.name) + "-" + category.id },
      });
    }
  }
  await prisma.category.deleteMany({
    where: { posts: { none: {} } },
  });
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { categories: true },
  });
  res.json({ post });
}

async function postPublishedPatch(req: any, res: any) {
  let { createdAt, published } = req.body;
  createdAt = createdAt ? createdAt : published ? new Date() : null;
  const post = await prisma.post.update({
    where: { uri: req.params.postUri },
    data: { createdAt, published },
  });
  res.json({ post });
}

async function commentContentPatch(req: any, res: any) {
  let comment = await prisma.comment.findUnique({
    where: { id: req.params.commentId },
  });
  if (req.user.id !== comment?.userId) {
    throw new AppError(
      "Hold up, superstar! This isn't your comment to remix. " +
        "Only the original author gets editing rights, think of it like VIP backstage access.",
      403,
    );
  }
  comment = await prisma.comment.update({
    where: { id: req.params.commentId },
    data: {
      updatedAt: new Date(),
      content: req.body.content,
    },
  });
  res.json({ comment });
}

async function commentReadPatch(req: any, res: any) {}

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
  let comment = await prisma.comment.findUnique({
    where: { id: req.params.commentId },
  });
  if (req.user.role !== "ADMIN" && req.user.id !== comment?.userId) {
    throw new AppError(
      "Whoa there, delete warrior! This isn't your comment to vanish. " +
        "Only the rightful author has the power to hit the big red button.",
      403,
    );
  }
  comment = await prisma.comment.delete({
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
  postPublishedPatch,
  commentContentPatch,
  commentReadPatch,
  postDelete,
  commentDelete,
};
