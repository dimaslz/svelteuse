<script lang="ts">
	import { Browser, DocTpl, H2, Highlight } from "@/components";
	import { useThrottle } from "@/hooks";

	import code from "./code-snippet";

	let value: string = "";

	const [state, updateState] = useThrottle("", 500);

	const onInput = ($event: Event) => {
		const { value: _value } = $event.target as HTMLInputElement;

		updateState(_value);
	};
</script>

<DocTpl title="useThrottle">
	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="bg-gray-950/50 p-4 flex">
			<div class="space-y-4 w-full">
				<p>
					<span class="font-bold">throttled value:</span> <code>{$state}</code>
				</p>
				<p>
					<span class="font-bold">realtime value:</span> <code>{value}</code>
				</p>
				<div>
					<input
						bind:value
						on:input={onInput}
						placeholder="write something here"
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
