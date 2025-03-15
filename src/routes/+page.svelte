<script lang="ts">
	import LayoutGrid from "lucide-svelte/icons/layout-grid";
	import LayoutList from "lucide-svelte/icons/layout-list";
	import Plus from "lucide-svelte/icons/plus";
	import fuzzysort from "fuzzysort";
	import { PersistedState } from "runed";
	import GridView from "$lib/components/GridView.svelte";
	import ListView from "$lib/components/ListView.svelte";
	import { Button } from "$lib/components/ui/button";
	import type { FormEventHandler } from "svelte/elements";

	const { data } = $props();
	let profiles = $state(data.profiles);

	const views = [
		{ name: "grid", icon: LayoutGrid },
		{ name: "list", icon: LayoutList },
	] as const;

	const view = new PersistedState<(typeof views)[number]["name"]>("view", "grid");

	const search: FormEventHandler<HTMLInputElement> = (event) => {
		const query = event.currentTarget.value.trim();
		const results = fuzzysort.go(query, data.profiles, { key: "fullName" });

		if (query) {
			profiles = results.map((result) => result.obj);
		} else {
			profiles = data.profiles;
		}
	};
</script>

<div class="sticky top-(--header-height) z-10">
	<div class="auto-grid grid divide-x border-b [--auto-grid-width:60px]">
		<search class="col-start-1 -col-end-3 grow">
			<input
				id="search"
				class="placeholder:text-muted-foreground bg-background size-full px-4 font-mono placeholder:text-sm focus-visible:outline-none"
				type="search"
				autocomplete="off"
				placeholder="Search profiles"
				oninput={search}
			/>
		</search>

		{#each views as { name, icon: Icon } (name)}
			<button
				class={[
					"hover:text-foreground hover:bg-accent bg-background flex aspect-square items-center justify-center p-5",
					view.current === name ? "text-foreground" : "text-muted-foreground",
				]}
				title="Toggle {name} view"
				type="button"
				onclick={() => (view.current = name)}
			>
				<Icon class="size-5" />
			</button>
		{/each}
	</div>

	<Button class="bg-background w-full border-0 border-b py-6" variant="outline">
		<Plus /> New profile
	</Button>
</div>

<output for="search">
	{#if profiles.length}
		{#if view.current === "grid"}
			<GridView {profiles} />
		{:else}
			<ListView {profiles} />
		{/if}
	{:else}
		<div class="text-muted-foreground mt-24 flex justify-center">
			<p>No results.</p>
		</div>
	{/if}
</output>
