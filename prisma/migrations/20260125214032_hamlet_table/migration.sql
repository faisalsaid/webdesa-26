-- CreateTable
CREATE TABLE "Hamlet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descriptions" TEXT,

    CONSTRAINT "Hamlet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hamlet_slug_key" ON "Hamlet"("slug");
