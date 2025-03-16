<script lang="ts">
	import type { Profile } from "$lib/server/db/schema";
	import { formatName } from "$lib/utils";
	import * as Card from "./ui/card";

	const { profiles }: { profiles: Profile[] } = $props();
</script>

<div class="auto-grid [--auto-grid-width:300px]">
	{#each profiles as profile (profile.id)}
		<Card.Root class="outline-border border-0 outline">
			<Card.Header>
				<Card.Title>{formatName(profile)}</Card.Title>
			</Card.Header>

			<Card.Content></Card.Content>

			<Card.Footer></Card.Footer>
		</Card.Root>
	{/each}
</div>
