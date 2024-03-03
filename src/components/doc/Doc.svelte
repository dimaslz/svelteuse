<script lang="ts">
	import { H1 } from "@/components";

	export let title: string = "";
</script>

<div class="w-full">
	<H1>{title}</H1>

	<div class="pb-6 text-sm [&>*]:space-y-2">
		<slot name="description" />
	</div>

	<div class="space-y-12">
		<div>
			<slot name="visual-example" />
		</div>

		<div>
			<slot name="code-example" />
		</div>
	</div>
</div>
