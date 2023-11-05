<script lang="ts">
	export let title: string = "";
</script>

<div class="w-full">
	<h1 class="text-4xl">{title}</h1>

	<div class="py-6">
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
