import { db } from "$lib/server/db";

export async function load({ params }) {
	const profile = await db.query.profile.findFirst({
		where: (t, { eq }) => eq(t.id, params.id),
		with: {
			relationships: {
				with: {
					relationship: true,
				},
			},
		},
	});

	return { profile };
}
