/*
  Warnings:

  - A unique constraint covering the columns `[uri]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uri]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_uri_key" ON "Category"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "Post_uri_key" ON "Post"("uri");
