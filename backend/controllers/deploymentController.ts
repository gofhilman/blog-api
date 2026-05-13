import { prisma } from "../lib/prisma";

async function lastDeploymentGet(req: any, res: any) {
  const lastDeployment = await prisma.deployment.findFirst({
    orderBy: { createdAt: "desc" },
  });
  res.json({ lastDeployment });
}

async function deploymentPost(req: any, res: any) {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true },
    where: { published: true },
  });
  const deployment = await prisma.deployment.create({
    data: {
      posts: { connect: posts },
    },
  });
  res.json({ deployment });
}

export { lastDeploymentGet, deploymentPost };
