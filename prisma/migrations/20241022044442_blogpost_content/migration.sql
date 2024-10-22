/*
  Warnings:

  - You are about to drop the column `url` on the `BlogPost` table. All the data in the column will be lost.
  - Added the required column `content` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "url",
ADD COLUMN     "content" TEXT NOT NULL,
ALTER COLUMN "isPublished" SET DEFAULT true;
