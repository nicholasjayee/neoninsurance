-- CreateEnum
CREATE TYPE "InsuranceType" AS ENUM ('MOTOR', 'HOME', 'HEALTH', 'TRAVEL');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "insuranceType" "InsuranceType" NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'DRAFT',
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "coverageLevel" TEXT NOT NULL,
    "monthlyPremium" DOUBLE PRECISION NOT NULL,
    "annualPremium" DOUBLE PRECISION NOT NULL,
    "carValue" DOUBLE PRECISION,
    "carMake" TEXT,
    "carModel" TEXT,
    "carYear" INTEGER,
    "mileage" DOUBLE PRECISION,
    "driverAge" INTEGER,
    "safeDriver" BOOLEAN,
    "homeValue" DOUBLE PRECISION,
    "homeType" TEXT,
    "homeAge" INTEGER,
    "securitySystem" BOOLEAN,
    "numberOfPeople" INTEGER,
    "ageRange" TEXT,
    "preExisting" BOOLEAN,
    "destination" TEXT,
    "tripDuration" INTEGER,
    "travelers" INTEGER,
    "tripType" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '30 days',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatbotKnowledge" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "patterns" TEXT[],
    "keywords" TEXT[],
    "responses" TEXT[],
    "priority" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatbotKnowledge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatbotKnowledge_category_idx" ON "ChatbotKnowledge"("category");

-- CreateIndex
CREATE INDEX "ChatbotKnowledge_isActive_idx" ON "ChatbotKnowledge"("isActive");
