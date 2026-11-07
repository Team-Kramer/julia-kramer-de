<script lang="ts">
	import type { DimensionResult } from '$lib/mental-load/types';
	import DimensionBar from './DimensionBar.svelte';

	interface Props {
		results: DimensionResult[];
	}

	let { results }: Props = $props();
</script>

<div class="space-y-10">
	<header class="space-y-3">
		<h1 class="text-3xl font-medium text-stone-900">Dein Mental-Load-Bild</h1>
		<p class="text-stone-600 leading-relaxed">
			Das ist keine Bewertung. Es ist eine Momentaufnahme davon, wo gerade besonders viel
			unsichtbare Arbeit liegt.
		</p>
	</header>

	<!-- Dimensionen -->
	<div class="space-y-8">
		{#each results as result}
			<div class="space-y-3">
				<div class="flex items-baseline justify-between">
					<h2 class="text-lg font-medium text-stone-800">{result.label}</h2>
					<span class="text-sm text-stone-500">{result.average} / 5</span>
				</div>
				<DimensionBar value={result.average} />
				<p class="text-stone-600 leading-relaxed">{result.text}</p>
			</div>
		{/each}
	</div>

	<!-- Gesamtschluss -->
	<div class="rounded-2xl bg-stone-50 border border-stone-200 p-6 space-y-3">
		<p class="text-stone-800 font-medium">Mental Load ist keine Charaktereigenschaft.</p>
		<p class="text-stone-600 leading-relaxed">
			Er ist verteilt – oder eben nicht. Sichtbarkeit ist der erste Schritt, ihn gerechter zu
			machen.
		</p>
	</div>

	<!-- Nächster Schritt -->
	<div class="pt-4 space-y-4">
		<p class="text-stone-600">
			Als Nächstes kannst du den <strong>Wochen-Last-Verteiler</strong> nutzen – er macht sichtbar,
			wer aktuell was trägt.
		</p>
		<a
			href="/werkzeuge/wochen-last-verteiler"
			class="inline-block px-6 py-3 rounded-lg bg-teal-800 text-white hover:bg-teal-900 transition"
		>
			Zum Wochen-Last-Verteiler
		</a>
	</div>
</div>
