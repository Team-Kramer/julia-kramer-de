<script lang="ts">
	import { onMount } from 'svelte';
	import type { DimensionResult } from '#lib/mental-load/types.js';
	import DimensionBar from './DimensionBar.svelte';

	interface Props {
		results: DimensionResult[];
		onRestart: () => void;
	}

	let { results, onRestart }: Props = $props();
	let resultHeading: HTMLHeadingElement;

	onMount(() => resultHeading.focus());
</script>

<section aria-labelledby="check-result-title">
	<p class="eyebrow">DEINE MOMENTAUFNAHME</p>
	<h1 id="check-result-title" bind:this={resultHeading} tabindex="-1">Was gerade bei dir liegt.</h1>
	<p class="content-lede">
		Die Werte zeigen den Durchschnitt deiner Antworten je Bereich. Sie sind keine Bewertung und
		keine Diagnose – sondern ein Anlass, genauer hinzusehen.
	</p>

	<div class="result-list">
		{#each results as result}
			<article class="dimension-result">
				<div class="dimension-result-head">
					<h2>{result.label}</h2>
					<span class="dimension-value">
						{result.average.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} von 5
					</span>
				</div>
				<DimensionBar value={result.average} label={result.label} />
				<p>{result.text}</p>
			</article>
		{/each}
	</div>

	<div class="result-summary">
		<p>Mental Load ist keine Charaktereigenschaft. Er ist verteilt – oder eben nicht.</p>
	</div>

	<aside class="next-tool" aria-labelledby="next-tool-title">
		<p class="eyebrow">EIN MÖGLICHER NÄCHSTER SCHRITT</p>
		<h2 id="next-tool-title">Verantwortung gemeinsam sichtbar machen.</h2>
		<p>
			Der Wochen-Last-Verteiler entsteht gerade. Bis er bereit ist, findest du im Denklabor
			Gedanken dazu, wie unsichtbare Arbeit aufgeteilt wird.
		</p>
		<a class="text-link" href="/blog/">Zum Denklabor <span aria-hidden="true">→</span></a>
	</aside>

	<div class="result-actions">
		<button class="button button-outline" type="button" onclick={onRestart}>Check neu starten</button>
		<a class="button button-primary" href="/werkzeuge/">Zur Werkzeugübersicht</a>
	</div>
</section>
