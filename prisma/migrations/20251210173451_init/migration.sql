-- AlterTable
ALTER TABLE "Quote" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';
