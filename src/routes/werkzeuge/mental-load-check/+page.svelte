<script lang="ts">
	import { tick } from 'svelte';
	import CheckForm from '#lib/components/mental-load/CheckForm.svelte';
	import ResultView from '#lib/components/mental-load/ResultView.svelte';
	import { questions, questionnaireVersion } from '#lib/mental-load/questions.js';
	import { calculateResults } from '#lib/mental-load/scoring.js';
	import type { Answer, DimensionResult } from '#lib/mental-load/types.js';

	let step: 'intro' | 'questions' | 'result' = $state('intro');
	let results: DimensionResult[] = $state([]);
	let introHeading = $state<HTMLHeadingElement>();
	let questionHeading = $state<HTMLHeadingElement>();

	function handleComplete(answers: Answer[]) {
		results = calculateResults(answers);
		step = 'result';
	}

	async function startCheck() {
		step = 'questions';
		await tick();
		questionHeading?.focus();
	}

	async function restart() {
		results = [];
		step = 'intro';
		await tick();
		introHeading?.focus();
	}
</script>

<svelte:head>
	<title>Mental-Load-Check – Julia Kramer</title>
	<meta
		name="description"
		content="Eine ruhige Momentaufnahme: Mach in fünf Minuten sichtbar, wo gerade organisatorischer, emotionaler und antizipierender Mental Load liegt."
	/>
	<link rel="canonical" href="https://julia-kramer.de/werkzeuge/mental-load-check/" />
	<meta property="og:title" content="Mental-Load-Check – Julia Kramer" />
	<meta
		property="og:description"
		content="Ein kostenloser, privater Check – ohne Bewertung und ohne Anmeldung."
	/>
</svelte:head>

<section class="tool-page" data-questionnaire={questionnaireVersion}>
	<a class="page-back" href="/werkzeuge/">← Alle Werkzeuge</a>

	{#if step === 'intro'}
		<p class="eyebrow">WERKZEUG 01 · CA. 5 MINUTEN</p>
		<h1 bind:this={introHeading} tabindex="-1">Mental-Load-Check</h1>
		<p class="content-lede">
			Dieser Check ist kein Test und keine Bewertung. Er macht nur sichtbar, was in deinem Alltag
			ohnehin schon da ist. Es gibt keine richtigen oder falschen Antworten.
		</p>
		<div class="tool-panel">
			<p>
				Beantworte 15 Aussagen zu Organisation, emotionaler Verantwortung und Vorausdenken. Am Ende
				siehst du eine Momentaufnahme der drei Bereiche.
			</p>
			<div class="tool-disclaimer">
				<strong>Nur für dich:</strong> Deine Antworten werden nicht übertragen oder gespeichert.
				Dieser Check ist keine psychologische oder medizinische Einschätzung.
			</div>
			<div class="tool-intro-actions">
				<button class="button button-primary" type="button" onclick={startCheck}>
					Check starten <span aria-hidden="true">→</span>
				</button>
			</div>
		</div>
	{:else if step === 'questions'}
		<p class="eyebrow">WERKZEUG 01 · DEINE MOMENTAUFNAHME</p>
		<h1 class="visually-hidden" bind:this={questionHeading} tabindex="-1">Mental-Load-Check: Fragen</h1>
		<div class="tool-panel">
			<CheckForm {questions} onComplete={handleComplete} />
		</div>
	{:else}
		<div class="tool-panel">
			<ResultView {results} onRestart={restart} />
		</div>
	{/if}
</section>
