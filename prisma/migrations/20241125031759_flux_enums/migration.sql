-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Model" ADD VALUE 'FLUX_1_PRO';
ALTER TYPE "Model" ADD VALUE 'FLUX_1_1_PRO';
ALTER TYPE "Model" ADD VALUE 'FLUX_1_DEV';
ALTER TYPE "Model" ADD VALUE 'FLUX_1_1_PRO_ULTRA';

-- AlterEnum
ALTER TYPE "Provider" ADD VALUE 'BFL';
