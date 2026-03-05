import slugify from "@sindresorhus/slugify";
import { prisma } from "../lib/prisma";
import { POSTS_PER_PAGE } from "./constants";
import uriToId from "../lib/uriToId";

async function categoriesGet(req: any, res: any) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  res.json({ categories });
}

async function specificCategoryGet(req: any, res: any) {
  const page = req.query.page;
  const published = req.query.published;
  const where = {
    ...(published && { published: +published === 1 }),
  };
  const category = await prisma.category.findUnique({
    where: { uri: req.params.categoryUri },
    include: {
      posts: {
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
      },
      _count: { select: { posts: where } },
    },
  });
  res.json({ category });
}

async function categoryPost(req: any, res: any) {
  const { name } = req.body;
  let category = await prisma.category.create({
    data: { name },
  });
  category = await prisma.category.update({
    where: { id: category.id },
    data: { uri: slugify(name) + "-" + category.id },
  });
  res.json({ category });
}

async function categoryPut(req: any, res: any) {
  const categoryId = uriToId(req.params.categoryUri);
  const { name } = req.body;
  const category = await prisma.category.update({
    where: { id: categoryId },
    data: { name, uri: slugify(name) + "-" + categoryId },
  });
  res.json({ category });
}

async function categoryDelete(req: any, res: any) {
  const category = await prisma.category.delete({
    where: { uri: req.params.categoryUri },
  });
  res.json({ category });
}

export {
  categoriesGet,
  specificCategoryGet,
  categoryPost,
  categoryPut,
  categoryDelete,
};
