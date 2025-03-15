import { faker } from "@faker-js/faker";
import { db } from "$lib/server/db";

export async function load() {
	const profiles = faker.helpers.multiple(
		() => {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();

			return {
				id: faker.string.uuid(),
				firstName,
				lastName,
				fullName: `${firstName} ${lastName}`,
				email: faker.internet.email({ firstName, lastName }),
				avatar: faker.image.avatarGitHub(),
			};
		},
		{ count: 15 },
	);

	return { profiles };
}
