<script lang="ts">
	import LogOut from "lucide-svelte/icons/log-out";
	import Moon from "lucide-svelte/icons/moon";
	import Sun from "lucide-svelte/icons/sun";
	import User from "lucide-svelte/icons/user";
	import { mode, toggleMode } from "mode-watcher";
	import { signOut, useSession } from "$lib/auth";
	import SignIn from "./SignIn.svelte";
	import { onMount } from "svelte";

	const navItems = [
		{ href: "/tools", label: "tools" },
		{ href: "/about", label: "about" },
	];

	const session = useSession();

	let open = $state(false);
	let header = $state<HTMLElement>();

	onMount(() => {
		if (header) {
			document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
		}
	});
</script>

<header class="bg-background sticky top-0 z-20 border-b font-mono text-sm" bind:this={header}>
	<nav class="auto-grid justify-between [--auto-grid-width:60px]">
		<a class="col-span-4 flex items-center gap-3 border-r px-6" href="/">
			<img src="https://placehold.co/24" alt="Osprey" />
			<span class="text-lg font-medium">Osprey</span>
		</a>

		<ul class="auto-grid col-start-5 -col-end-1 divide-x *:h-full">
			<div class="-col-end-7"></div>

			{#each navItems as item (item.label)}
				<li class="group relative col-span-2 first:border-l">
					<a
						class="group-hover:text-foreground text-muted-foreground flex size-full items-center justify-center"
						href={item.href}
					>
						{item.label}
					</a>
				</li>
			{/each}

			<li class="flex aspect-square items-center justify-center">
				<button
					class="text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
					type="button"
					onclick={toggleMode}
				>
					{#if $mode === "dark"}
						<Moon class="size-4" />
					{:else}
						<Sun class="size-4" />
					{/if}
				</button>
			</li>

			<li class="flex aspect-square items-center justify-center">
				{#if $session.data}
					<button
						class="text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
						type="button"
						onclick={async () => await signOut()}
						aria-label="Sign out"
					>
						<LogOut class="size-4" />
					</button>
				{:else}
					<button
						class="text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
						type="button"
						onclick={() => (open = true)}
						aria-label="Sign in"
					>
						<User class="size-4" />
					</button>
				{/if}
			</li>
		</ul>
	</nav>
</header>

<SignIn bind:open />
