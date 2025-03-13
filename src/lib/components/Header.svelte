<script lang="ts">
	import LogOut from "lucide-svelte/icons/log-out";
	import Moon from "lucide-svelte/icons/moon";
	import Sun from "lucide-svelte/icons/sun";
	import User from "lucide-svelte/icons/user";
	import { mode, toggleMode } from "mode-watcher";
	import { signOut, useSession } from "$lib/auth";
	import SignIn from "./SignIn.svelte";

	const navItems = [
		{ href: "/tools", label: "tools" },
		{ href: "/about", label: "about" },
	];

	const session = useSession();

	let open = $state(false);
</script>

<header class="bg-background sticky top-0 z-10 border-b font-mono text-sm">
	<nav class="flex max-h-13 justify-between">
		<a class="flex items-center gap-3 border-r px-6 py-4" href="/">
			<img src="https://placehold.co/24" alt="Osprey" />
			<span class="text-lg font-medium">Osprey</span>
		</a>

		<ul class="flex items-center divide-x">
			{#each navItems as item (item.label)}
				<li class="group relative px-6 py-4 first:border-l">
					<a
						class="group-hover:text-foreground text-muted-foreground block size-full"
						href={item.href}
					>
						{item.label}
					</a>
				</li>
			{/each}

			<li>
				<button
					class="text-muted-foreground hover:text-foreground flex h-13 w-14 items-center justify-center"
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

			<li>
				{#if $session.data}
					<button
						class="text-muted-foreground hover:text-foreground flex h-13 w-14 items-center justify-center"
						type="button"
						onclick={async () => await signOut()}
						aria-label="Sign out"
					>
						<LogOut class="size-4" />
					</button>
				{:else}
					<button
						class="text-muted-foreground hover:text-foreground flex w-14 items-center justify-center"
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
