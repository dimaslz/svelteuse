export default `
<script lang="ts">
	import { useFetch } from "@dimaslz/svelte-hooks";

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


<div>
	<div>error: {JSON.stringify($fetchResult.error, null, 2)}</div>
	<div>data: {JSON.stringify($fetchResult.data, null, 2)}</div>
</div>

`;
