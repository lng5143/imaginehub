/*
  Warnings:

  - Added the required column `thumbnailUrl` to the `BlogPosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPosts" ADD COLUMN     "thumbnailUrl" TEXT NOT NULL;
