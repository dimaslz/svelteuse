<script lang="ts">
	import { Browser, DocTpl, H2, Highlight, Link } from "@/components";
	import { useState, useThrottleFn } from "@/hooks";

	import { exampleCode, sourceCode } from "./code-snippet";

	let value: string = "";
	const [state, setState] = useState(value);

	const updateState = (value: string) => {
		setState(value);
	};

	const throttledFunction = useThrottleFn(updateState, 500);

	const onInput = ($event: Event) => {
		const { value: _value } = $event.target as HTMLInputElement;

		throttledFunction(_value);
	};
</script>

<DocTpl title="useThrottleFn">
	<div slot="description">
		<p>Throttle event by a hook.</p>

		<h3 class="text-lg">Related hooks:</h3>
		<ul class="list-disc pl-6">
			<li><Link href="/guide/useState">useState</Link></li>
			<li><Link href="/guide/useThrottleFn">useThrottleFn</Link></li>
		</ul>

		<h3 class="text-lg">Inspired on:</h3>
		<ul class="list-disc pl-6">
			<li>
				<Link href="https://usehooks.com/usethrottle" target="_blank"
					>https://usehooks.com/usethrottle</Link
				>
			</li>
			<li>
				<Link href="https://vueuse.org/shared/useThrottleFn/" target="_blank"
					>https://vueuse.org/shared/useThrottleFn/</Link
				>
			</li>
		</ul>
	</div>

	<div slot="visual-example">
		<H2>Visual example</H2>

		<Browser body="bg-gray-950/50 p-4 flex">
			<div class="space-y-2 w-full">
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
						placeholder="type something and every 200ms, the value will be updated"
						class="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900 w-full"
					/>
				</div>
			</div>
		</Browser>
	</div>

	<div slot="code-example">
		<div>
			<H2>Code base</H2>

			<Highlight language="typescript" code={sourceCode} />
		</div>

		<div class="mt-12">
			<H2>Code example</H2>

			<Highlight code={exampleCode} />
		</div>
	</div>
</DocTpl>
