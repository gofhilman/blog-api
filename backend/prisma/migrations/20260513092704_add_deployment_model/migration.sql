-- CreateTable
CREATE TABLE "Deployment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deployment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeploymentToPost" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DeploymentToPost_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DeploymentToPost_B_index" ON "_DeploymentToPost"("B");

-- AddForeignKey
ALTER TABLE "_DeploymentToPost" ADD CONSTRAINT "_DeploymentToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Deployment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeploymentToPost" ADD CONSTRAINT "_DeploymentToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
