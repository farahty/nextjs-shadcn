CREATE TABLE IF NOT EXISTS "todo" (
	"id" uuid PRIMARY KEY NOT NULL,
	"text" text,
	"isCompleted" boolean,
	"createdAt" timestamp
);
