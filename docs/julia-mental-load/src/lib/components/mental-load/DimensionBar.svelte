<script lang="ts">
	interface Props {
		value: number; // 1–5
	}

	let { value }: Props = $props();

	const percent = $derived(Math.min(100, Math.max(0, (value / 5) * 100)));
</script>

<div class="h-2.5 w-full rounded-full bg-stone-200 overflow-hidden">
	<div
		class="h-full rounded-full bg-teal-800 transition-all duration-500"
		style="width: {percent}%"
	></div>
</div>
