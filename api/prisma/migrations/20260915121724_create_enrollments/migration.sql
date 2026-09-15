-- CreateTable
CREATE TABLE "enrollments" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "graduation_year" INTEGER NOT NULL,
    "accepted_terms" BOOLEAN NOT NULL,
    "whatsapp_opt_in" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_cpf_key" ON "enrollments"("cpf");
