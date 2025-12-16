-- CreateEnum
CREATE TYPE "IncidentType" AS ENUM ('CAR', 'HOME', 'HEALTH', 'CYBER', 'TRAVEL');

-- CreateEnum
CREATE TYPE "ClaimStatus" AS ENUM ('RECEIVED', 'REVIEWING', 'ASSESSING', 'APPROVED', 'PAID', 'REJECTED');

-- CreateTable
CREATE TABLE "Claim" (
    "id" TEXT NOT NULL,
    "policyNumber" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "incidentType" "IncidentType" NOT NULL,
    "incidentDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "photos" TEXT[],
    "voiceNoteUrl" TEXT,
    "status" "ClaimStatus" NOT NULL DEFAULT 'RECEIVED',
    "estimatedPayout" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimStatusHistory" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "status" "ClaimStatus" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClaimStatusHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClaimStatusHistory" ADD CONSTRAINT "ClaimStatusHistory_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim"("id") ON DELETE CASCADE ON UPDATE CASCADE;
