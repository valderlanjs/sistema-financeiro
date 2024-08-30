ALTER TABLE "accounts" ADD COLUMN "nome" text NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "name";