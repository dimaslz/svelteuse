<script lang="ts">
	import { Browser, H2, Highlight } from "@/components";
	import { useFetch } from "@/hooks";

	import code from "./code-snippet";

	const url = "https://randomdata-api.loremapi.io";

	const fetchResult = useFetch<{ value: boolean }>(url, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			schema:
				"U2FsdGVkX18yd3+hdSaN0M/OZD8dylEoJZiSl/631HcuqeLfT/37QaxzBf/v0OlJ4yMoW+QxkMRW1IoiUfH+y4BKfv1cV/GS36WHbEgEI3+BCC8Df8O7O3LC6uMgp/50aasoB6I2k3rfFvNfA6V5sLY2aKq4oH9dLrcTwbkDo+s=",
		},
	});
</script>

<div class="w-full space-y-12">
	<h1 class="text-4xl">useFetch</h1>

	<div>
		<H2>Visual example</H2>

		<Browser body="p-4 bg-gray-950/50">
			<div>
				<div>error: {JSON.stringify($fetchResult.error, null, 2)}</div>
				<div>data: {JSON.stringify($fetchResult.data, null, 2)}</div>
			</div>
		</Browser>
	</div>

	<div class="mt-12 text-xs">
		<H2>Code example</H2>

		<Highlight {code} />
	</div>
</div>