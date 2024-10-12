/*
  Warnings:

  - Changed the type of `eventType` on the `Webhook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Webhook" DROP COLUMN "eventType",
ADD COLUMN     "eventType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "WebhookEventType";
