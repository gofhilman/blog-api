import slugify from "@sindresorhus/slugify";
import { prisma } from "../lib/prisma";

async function categoriesGet(req: any, res: any) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  res.json({ categories });
}

async function specificCategoryGet(req: any, res: any) {
  const category = await prisma.category.findUnique({
    where: { uri: req.params.categoryUri },
    include: { posts: true },
  });
  res.json({ category });
}

async function categoryPost(req: any, res: any) {
  const { name } = req.body;
  const category = await prisma.category.create({
    data: { name, uri: slugify(name) },
  });
  res.json({ category });
}

async function categoryPut(req: any, res: any) {
  const { name } = req.body;
  const category = await prisma.category.update({
    where: { uri: req.params.categoryUri },
    data: { name, uri: slugify(name) },
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
