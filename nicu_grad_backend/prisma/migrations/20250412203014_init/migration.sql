-- CreateTable
CREATE TABLE "Feeding" (
    "id" SERIAL NOT NULL,
    "method" TEXT NOT NULL,
    "volume" INTEGER,
    "side" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feeding_pkey" PRIMARY KEY ("id")
);
