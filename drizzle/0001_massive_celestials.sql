CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"user_id" text,
	"first_name" text NOT NULL,
	"middle_name" text,
	"last_name" text,
	"nickname" text,
	"email" text,
	"sex" text,
	"birthdate" timestamp,
	"phone_number" text,
	"country" text,
	"state" text,
	"city" text,
	"postal_code" text,
	"address1" text,
	"address2" text,
	"eye_color" text,
	"hair_color" text,
	"height" numeric(5, 2),
	"weight" numeric(5, 2),
	"notes" text,
	"images" text[] DEFAULT '{}'
);
--> statement-breakpoint
CREATE TABLE "related_profiles" (
	"parent_id" uuid NOT NULL,
	"relation_id" uuid NOT NULL,
	"relation_type" text NOT NULL,
	CONSTRAINT "related_profiles_parent_id_relation_id_pk" PRIMARY KEY("parent_id","relation_id")
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "related_profiles" ADD CONSTRAINT "related_profiles_parent_id_profiles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "related_profiles" ADD CONSTRAINT "related_profiles_relation_id_profiles_id_fk" FOREIGN KEY ("relation_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;