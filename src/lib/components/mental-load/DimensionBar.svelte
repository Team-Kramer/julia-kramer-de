<script lang="ts">
	interface Props {
		value: number;
		label: string;
	}

	let { value, label }: Props = $props();
	const width = $derived(`${Math.min(100, Math.max(0, (value / 5) * 100))}%`);
</script>

<div class="dimension-bar" role="img" aria-label={`${label}: ${value.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} von 5`}>
	<div class="dimension-bar-fill" style={`width: ${width}`}></div>
</div>
