-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentMethod" DROP NOT NULL,
ALTER COLUMN "currency" DROP NOT NULL,
ALTER COLUMN "currency" DROP DEFAULT;
