import slugify from "@sindresorhus/slugify";
import { prisma } from "../lib/prisma";
import uriToId from "../lib/uriToId";

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
  let category = await prisma.category.create({
    data: { name: req.body.name },
  });
  category = await prisma.category.update({
    where: { id: category.id },
    data: { uri: slugify(category.name) + "-" + category.id },
  });
  res.json({ category });
}

async function categoryPut(req: any, res: any) {
  const categoryId = uriToId(req.params.categoryUri);
  const { name } = req.body;
  const category = await prisma.category.update({
    where: { id: categoryId },
    data: {
      name,
      uri: slugify(name) + "-" + categoryId,
    },
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
