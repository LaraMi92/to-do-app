
BEGIN;

DROP TABLE IF EXISTS "list",
"card",
"tag",
"tag_belongs_card";

CREATE TABLE IF NOT EXISTS "list" (
"id" serial PRIMARY KEY,
"title" text NOT NULL,
"position" integer DEFAULT 0 NOT NULL,
"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS "card" (
"id" serial PRIMARY KEY,
"title" text NOT NULL,
"position" integer DEFAULT 0 NOT NULL,
"color" text,
"list_id" integer NOT NULL REFERENCES "list" ("id"),
"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS "tag" (
"id" serial PRIMARY KEY,
"title" text NOT NULL,
"color" text,
"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS "tag_belongs_card" (
"tag_id" integer REFERENCES "tag"("id"),
"card_id" integer REFERENCES "card" ("id"),
PRIMARY KEY ("tag_id", "card_id"),
"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" TIMESTAMP  
);

COMMIT;

