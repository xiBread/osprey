import { faker } from "@faker-js/faker";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

await db.delete(schema.profile);

const [user] = await db.select().from(schema.user);
if (!user) throw new Error("Initial user not found");

const profiles = faker.helpers.multiple<schema.InsertProfile>(
	() => {
		const firstName = faker.person.firstName();
		const lastName = Math.random() > 0.5 ? faker.person.lastName() : null;
		const sex = faker.person.sex();

		const isMale = sex === "male";

		return {
			id: faker.string.uuid(),
			userId: user.id,
			avatarUrl: faker.image.avatar(),
			firstName,
			middleName: Math.random() > 0.75 ? faker.person.middleName() : null,
			lastName,
			nickname: Math.random() > 0.85 ? faker.lorem.word() : null,
			email: faker.internet.email({ firstName, lastName: lastName ?? undefined }),
			sex,
			birthdate: faker.date.birthdate({ mode: "age", min: 18, max: 50 }),
			phoneNumber: faker.phone.number({ style: "national" }),
			country: faker.location.country(),
			state: faker.location.state(),
			city: faker.location.city(),
			postalCode: faker.location.zipCode(),
			address1: faker.location.streetAddress(),
			address2: Math.random() > 0.75 ? faker.location.secondaryAddress() : null,
			eyeColor: faker.color.rgb(),
			hairColor: faker.color.rgb(),
			height: faker.number
				.float({ min: isMale ? 160 : 150, max: isMale ? 190 : 175, fractionDigits: 2 })
				.toString(),
			weight: faker.number
				.float({ min: isMale ? 55 : 45, max: isMale ? 100 : 85, fractionDigits: 2 })
				.toString(),
			notes: Math.random() > 0.8 ? faker.lorem.paragraph() : null,
			images: faker.helpers.multiple(() => faker.image.url(), { count: { min: 0, max: 6 } }),
		};
	},
	{ count: 15 },
);

await db.insert(schema.profile).values(profiles);
