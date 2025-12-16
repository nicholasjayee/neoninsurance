-- CreateTable
CREATE TABLE "PricingFactor" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "PricingFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskZone" (
    "id" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "floodRisk" TEXT NOT NULL,
    "theftRisk" TEXT NOT NULL,
    "fireRisk" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "RiskZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competitor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avgMonthlyRate" DOUBLE PRECISION NOT NULL,
    "neonSavingsPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0.20,

    CONSTRAINT "Competitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'General',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PricingFactor_key_key" ON "PricingFactor"("key");

-- CreateIndex
CREATE UNIQUE INDEX "RiskZone_zipCode_key" ON "RiskZone"("zipCode");

-- CreateIndex
CREATE UNIQUE INDEX "Competitor_name_key" ON "Competitor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");
