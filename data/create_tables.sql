
/*START TRANSACTION*/

BEGIN;

DROP TABLE IF EXISTS "list",
"card",
"tag",
"tag_belongs_card";

/*TABLE LIST*/

CREATE TABLE IF NOT EXISTS "list" (
"id" serial PRIMARY KEY,
"title" text NOT NULL,
"position" integer DEFAULT 0,
"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/*TABLE CARD*/

CREATE TABLE IF NOT EXISTS "card" (
"id" serial PRIMARY KEY,
"title" text NOT NULL,
"position" integer DEFAULT 0,
"color" text DEFAULT '#fff',
"list_id" integer NOT NULL REFERENCES "list" ("id"),
"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/*TABLE TAG*/

CREATE TABLE IF NOT EXISTS "tag" (
"id" serial PRIMARY KEY,
"title" text NOT NULL,
"color" text DEFAULT '#fff',
"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/*INTERMEDIATE TABLE CARD/TAG
if matching value of card(=tag) and tag(=card) disappears, both values (=single line) are deleted, no more association*/

CREATE TABLE IF NOT EXISTS "tag_belongs_card" (
"tag_id" integer REFERENCES "tag"("id") ON DELETE CASCADE,
"card_id" integer REFERENCES "card" ("id") ON DELETE CASCADE,
PRIMARY KEY ("tag_id", "card_id"),
"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;

