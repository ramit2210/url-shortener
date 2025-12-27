CREATE TABLE "urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"original_url" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "code_idx" ON "urls" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "url_idx" ON "urls" USING btree ("original_url");