-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tools" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "homeContentId" INTEGER,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_homeContentId_fkey" FOREIGN KEY ("homeContentId") REFERENCES "HomeContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
