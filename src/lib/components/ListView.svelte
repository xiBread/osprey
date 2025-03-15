<script lang="ts">
	import * as Avatar from "./ui/avatar";

	const { profiles }: { profiles: Record<string, any>[] } = $props();
</script>

<ul class="flex w-full flex-col divide-y">
	{#each profiles as profile (profile.id)}
		<li class="p-4">
			<div class="flex items-center gap-4">
				<Avatar.Root class="border">
					<Avatar.Image src={profile.avatar} alt={profile.fullName} />
					<Avatar.Fallback>{profile.firstName[0]}</Avatar.Fallback>
				</Avatar.Root>

				<div class="flex flex-col">
					<span>{profile.fullName}</span>

					{#if profile.email}
						<span class="text-muted-foreground text-sm">{profile.email}</span>
					{/if}
				</div>
			</div>
		</li>
	{/each}
</ul>
