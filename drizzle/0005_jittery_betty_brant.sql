ALTER TABLE "accounts" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "nome";