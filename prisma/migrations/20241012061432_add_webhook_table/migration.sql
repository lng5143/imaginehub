-- CreateEnum
CREATE TYPE "WebhookEventType" AS ENUM ('ORDER_CREATED', 'ORDER_REFUNDED');

-- CreateEnum
CREATE TYPE "WebhookProvider" AS ENUM ('LEMON_SQUEEZY');

-- CreateEnum
CREATE TYPE "WebhookStatus" AS ENUM ('PENDING', 'PROCESSED', 'FAILED');

-- CreateTable
CREATE TABLE "Webhook" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "provider" "WebhookProvider" NOT NULL,
    "eventType" "WebhookEventType" NOT NULL,
    "payload" TEXT NOT NULL,
    "status" "WebhookStatus" NOT NULL DEFAULT 'PENDING',
    "retries" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);
