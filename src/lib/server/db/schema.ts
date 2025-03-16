import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, uuid, primaryKey, numeric } from "drizzle-orm/pg-core";

export const profile = pgTable("profiles", {
	// Metadata
	id: uuid().primaryKey(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at"),
	userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),

	// User-supplied
	avatarUrl: text("avatar_url"),
	firstName: text("first_name").notNull(),
	middleName: text("middle_name"),
	lastName: text("last_name"),
	nickname: text(),
	email: text(),
	sex: text(),
	birthdate: timestamp(),
	phoneNumber: text("phone_number"),
	country: text(),
	state: text(),
	city: text(),
	postalCode: text("postal_code"),
	address1: text(),
	address2: text(),
	eyeColor: text("eye_color"),
	hairColor: text("hair_color"),
	// centimeters
	height: numeric({ precision: 5, scale: 2 }),
	// kilograms
	weight: numeric({ precision: 5, scale: 2 }),
	notes: text(),
	images: text().notNull().array().default([]),
});

export const profileRelations = relations(profile, ({ one, many }) => ({
	user: one(user, {
		fields: [profile.userId],
		references: [user.id],
	}),
	relationships: many(relatedProfiles),
}));

export const relatedProfiles = pgTable(
	"related_profiles",
	{
		profileId: uuid("parent_id")
			.notNull()
			.references(() => profile.id, { onDelete: "cascade" }),
		relationshipId: uuid("relation_id")
			.notNull()
			.references(() => profile.id, { onDelete: "cascade" }),
		relationshipType: text("relation_type").notNull(),
	},
	(t) => [primaryKey({ columns: [t.profileId, t.relationshipId] })],
);

export const relatedProfilesRelations = relations(relatedProfiles, ({ one }) => ({
	profile: one(profile, {
		fields: [relatedProfiles.profileId],
		references: [profile.id],
	}),
	relationship: one(profile, {
		fields: [relatedProfiles.relationshipId],
		references: [profile.id],
	}),
}));

// #region Better Auth

export const user = pgTable("users", {
	id: text().primaryKey(),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
	profiles: many(profile),
}));

export const session = pgTable("sessions", {
	id: text().primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text().notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("accounts", {
	id: text().primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verifications", {
	id: text().primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

// #endregion

export type Profile = typeof profile.$inferSelect;
export type InsertProfile = typeof profile.$inferInsert;
