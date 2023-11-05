<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { useDebounceFn, useState } from "@/hooks";

	import code from "./code-snippet";

	let value: string = "";
	const [state, updateValue] = useState("");

	const fnUpdate = (value: string) => {
		updateValue(value);
	};

	const updateStateFn = useDebounceFn<string>(fnUpdate, 200);

	const onInput = ($event: Event) => {
		const { value } = $event.target as HTMLInputElement;

		updateStateFn(value);
	};
</script>

<DocTpl title="useDebounceFn">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div class="w-full space-y-2">
				<p>
					<span class="font-bold">sync value:</span> <code>{value}</code>
				</p>
				<p>
					<span class="font-bold">debounced value:</span> <code>{$state}</code>
				</p>
				<div class="w-full">
					<input
						bind:value
						on:input={onInput}
						placeholder="type something and until 200ms, the value will be debounced"
						class="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900 w-full"
					/>
				</div>
			</div>
		</Browser>
	</div>

	<div slot="code-example">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</DocTpl>
