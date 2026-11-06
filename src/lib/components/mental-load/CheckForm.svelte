<script lang="ts">
	import type { Answer, Question } from '#lib/mental-load/types.js';
	import QuestionCard from './QuestionCard.svelte';

	interface Props {
		questions: Question[];
		onComplete: (answers: Answer[]) => void;
	}

	let { questions, onComplete }: Props = $props();
	let currentIndex = $state(0);
	let answers = $state<Record<string, number>>({});

	const currentQuestion = $derived(questions[currentIndex]);
	const currentValue = $derived(answers[currentQuestion.id] ?? null);
	const isLastQuestion = $derived(currentIndex === questions.length - 1);

	function updateAnswer(value: number) {
		answers = { ...answers, [currentQuestion.id]: value };
	}

	function goBack() {
		if (currentIndex > 0) currentIndex -= 1;
	}

	function goForward() {
		if (currentValue === null) return;

		if (isLastQuestion) {
			const completeAnswers = questions.map((question) => {
				const value = answers[question.id];
				if (value === undefined) {
					throw new Error(`Missing answer for question: ${question.id}`);
				}
				return { questionId: question.id, value };
			});
			onComplete(completeAnswers);
			return;
		}

		currentIndex += 1;
	}
</script>

<div class="check-progress">
	<div class="check-progress-label">
		<span aria-live="polite">Frage {currentIndex + 1} von {questions.length}</span>
		<span>
			{currentIndex === questions.length - 1
				? 'Letzte Frage'
				: `${questions.length - currentIndex - 1} weitere Fragen`}
		</span>
	</div>
	<progress
		value={currentIndex + 1}
		max={questions.length}
		aria-label="Fortschritt im Mental-Load-Check"
	></progress>
</div>

<form
	onsubmit={(event) => {
		event.preventDefault();
		goForward();
	}}
>
	<QuestionCard question={currentQuestion} {currentValue} onAnswer={updateAnswer} />

	<div class="check-actions">
		<button class="button-quiet" type="button" onclick={goBack} disabled={currentIndex === 0}>
			← Zurück
		</button>
		<button class="button button-primary" type="submit" disabled={currentValue === null}>
			{isLastQuestion ? 'Ergebnis ansehen' : 'Weiter'}
			{#if !isLastQuestion}<span aria-hidden="true">→</span>{/if}
		</button>
	</div>
</form>
