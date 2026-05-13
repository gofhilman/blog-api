import { prisma } from "../lib/prisma";

async function latestDeploymentGet(req: any, res: any) {
  const latestDeployment = await prisma.deployment.findFirst({
    orderBy: { createdAt: "desc" },
  });
  res.json({ latestDeployment });
}

async function deploymentPost(req: any, res: any) {
  await fetch(
    process.env.CF_PAGES_DEPLOY_HOOK ??
      (() => {
        throw new Error("CF_PAGES_DEPLOY_HOOK missing");
      })(),
    { method: "POST" },
  );
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

export { latestDeploymentGet, deploymentPost };
