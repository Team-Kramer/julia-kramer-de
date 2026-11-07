<script lang="ts">
	import { questions } from '$lib/mental-load/questions';
	import { calculateResults } from '$lib/mental-load/scoring';
	import type { Answer, DimensionResult } from '$lib/mental-load/types';
	import CheckForm from '$lib/components/mental-load/CheckForm.svelte';
	import ResultView from '$lib/components/mental-load/ResultView.svelte';

	let step: 'intro' | 'questions' | 'result' = $state('intro');
	let answers: Answer[] = $state([]);
	let results: DimensionResult[] = $state([]);

	function handleComplete(a: Answer[]) {
		answers = a;
		results = calculateResults(a);
		step = 'result';
	}
</script>

<svelte:head>
	<title>Mental-Load-Check – Julia Kramer</title>
	<meta
		name="description"
		content="5-Minuten-Check, der sichtbar macht, wo gerade besonders viel Mental Load liegt – ohne Bewertung."
	/>
</svelte:head>

<section class="max-w-2xl mx-auto px-4 py-12">
	{#if step === 'intro'}
		<div class="space-y-6">
			<h1 class="text-3xl font-medium text-stone-900">Mental-Load-Check</h1>
			<p class="text-lg text-stone-600 leading-relaxed">
				Dieser Check ist kein Test und keine Bewertung. Er macht nur sichtbar, was in deinem Alltag
				ohnehin schon da ist. Es gibt keine richtigen oder falschen Antworten.
			</p>
			<button
				type="button"
				class="px-6 py-3 rounded-lg bg-teal-800 text-white hover:bg-teal-900 transition"
				onclick={() => (step = 'questions')}
			>
				Check starten
			</button>
		</div>
	{:else if step === 'questions'}
		<CheckForm {questions} onComplete={handleComplete} />
	{:else}
		<ResultView {results} />
	{/if}
</section>
