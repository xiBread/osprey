import { db } from "$lib/server/db";

export async function load() {
	const profiles = await db.query.profile.findMany();

	return { profiles };
}
