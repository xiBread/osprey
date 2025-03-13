<script lang="ts">
	import "@fontsource-variable/jetbrains-mono";
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
	import { ModeWatcher } from "mode-watcher";

	const { children } = $props();
</script>

<ModeWatcher />
<Header />

<main>
	{@render children()}
</main>
