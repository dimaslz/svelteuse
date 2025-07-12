<script lang="ts">
	import { H1, H2, Highlight, Link } from "@/components";

	import { demo } from "./code-snippets";

	type Manager = "npm" | "pnpm" | "yarn" | "bun";
	const commandMap: Record<Manager, string> = {
	  npm: "$ npm add @dimaslz/svelteuse",
	  pnpm: "$ pnpm add @dimaslz/svelteuse",
	  yarn: "$ yarn add @dimaslz/svelteuse",
	  bun: "$ bun add @dimaslz/svelteuse"
	};
	let manager: Manager = "npm";
	let command = commandMap[manager];

	const handleChangeManager = (_manager: Manager) => {
	  manager = _manager;
		command = commandMap[manager];
	}
</script>

<!-- eslint-disable no-useless-escape -->
<div class="w-full">
	<H1>Installation</H1>

	<div class="space-y-4 text-base">
		<p>
			SvelteUse is a Svelte hooks library, written in Typescript and easy to use. As with Svelte is
			possible to work as React hooks and Vue composables, I was inpired to make this project in <Link
				href="https://usehooks.com"
				target="_blank">https://usehooks.com</Link
			>, <Link href="https://usehooks-ts.com" target="_blank">https://usehooks-ts.com</Link> and <Link
				href="https://vueuse.org"
				target="_blank">https://vueuse.org</Link
			>.
		</p>
	</div>

	<div class="space-y-4 mt-6">
		<div>
      <ul class="flex text-[#ff3e00]/80 space-x-2 px-2">
        <li>
          <button
            class={["text-[#ff3e00]/80 hover:text-[#ff3e00] dark:hover:text-[#ff3e00] cursor-pointer", manager === 'npm' ? '' : 'underline'].join(" ")}
            on:click={() => handleChangeManager("npm")}
          >npm</button>
        </li>
        <li>
          <button
            class={["text-[#ff3e00]/80 hover:text-[#ff3e00] dark:hover:text-[#ff3e00] cursor-pointer", manager === 'pnpm' ? '' : 'underline'].join(" ")}
            on:click={() => handleChangeManager("pnpm")}
          >pnpm</button>
        </li>
        <li>
          <button
            class={["text-[#ff3e00]/80 hover:text-[#ff3e00] dark:hover:text-[#ff3e00] cursor-pointer", manager === 'yarn' ? '' : 'underline'].join(" ")}
            on:click={() => handleChangeManager("yarn")}
          >yarn</button>
        </li>
        <li>
          <button
            class={["text-[#ff3e00]/80 hover:text-[#ff3e00] dark:hover:text-[#ff3e00] cursor-pointer", manager === 'bun' ? '' : 'underline'].join(" ")}
            on:click={() => handleChangeManager("bun")}
          >bun</button>
        </li>
      </ul>
			<Highlight
				code={`
		${command}`}
			/>
		</div>

		<div>
			<H2>How to use in code</H2>
			<Highlight code={demo} />
		</div>
	</div>
</div>
