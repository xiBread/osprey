import { db } from "$lib/server/db";

export async function load() {
	const profiles = await db.query.profile.findMany({
		orderBy: (t, { asc, desc }) => [asc(t.firstName), desc(t.birthdate)],
	});

	return { profiles };
}
