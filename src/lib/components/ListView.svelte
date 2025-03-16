<script lang="ts">
	import type { Profile } from "$lib/server/db/schema";
	import { formatName } from "$lib/utils";
	import * as Avatar from "./ui/avatar";

	const { profiles }: { profiles: Profile[] } = $props();
</script>

<ul class="flex w-full flex-col divide-y">
	{#each profiles as profile (profile.id)}
		{@const fullName = formatName(profile)}

		<li class="p-4">
			<div class="flex items-center gap-4">
				<Avatar.Root class="border">
					<Avatar.Image src={profile.avatarUrl} alt={fullName} />
					<Avatar.Fallback>{profile.firstName[0]}</Avatar.Fallback>
				</Avatar.Root>

				<div class="flex flex-col">
					<span>{fullName}</span>

					{#if profile.email}
						<span class="text-muted-foreground text-sm">{profile.email}</span>
					{/if}
				</div>
			</div>
		</li>
	{/each}
</ul>
