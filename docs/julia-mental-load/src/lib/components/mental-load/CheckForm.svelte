<script lang="ts">
	import type { Question, Answer } from '$lib/mental-load/types';
	import QuestionCard from './QuestionCard.svelte';

	interface Props {
		questions: Question[];
		onComplete: (answers: Answer[]) => void;
	}

	let { questions, onComplete }: Props = $props();

	let currentIndex = $state(0);
	let answers = $state<Answer[]>([]);

	const currentQuestion = $derived(questions[currentIndex]);
	const progress = $derived(((currentIndex + 1) / questions.length) * 100);
	const isLast = $derived(currentIndex === questions.length - 1);

	function handleAnswer(value: number) {
		const existing = answers.findIndex((a) => a.questionId === currentQuestion.id);
		const newAnswer: Answer = { questionId: currentQuestion.id, value };

		if (existing >= 0) {
			answers[existing] = newAnswer;
			answers = [...answers];
		} else {
			answers = [...answers, newAnswer];
		}

		if (isLast) {
			onComplete(answers);
		} else {
			currentIndex += 1;
		}
	}

	function goBack() {
		if (currentIndex > 0) currentIndex -= 1;
	}
</script>

<div class="space-y-8">
	<!-- Progress -->
	<div class="space-y-2">
		<div class="flex justify-between text-sm text-stone-500">
			<span>Frage {currentIndex + 1} von {questions.length}</span>
			<span>{Math.round(progress)}%</span>
		</div>
		<div class="h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
			<div
				class="h-full rounded-full bg-teal-800 transition-all duration-300"
				style="width: {progress}%"
			></div>
		</div>
	</div>

	<!-- Question -->
	<QuestionCard
		question={currentQuestion}
		currentValue={answers.find((a) => a.questionId === currentQuestion.id)?.value}
		onAnswer={handleAnswer}
	/>

	<!-- Navigation -->
	<div class="flex justify-between pt-4">
		<button
			type="button"
			class="text-sm text-stone-500 hover:text-stone-800 disabled:opacity-30"
			disabled={currentIndex === 0}
			onclick={goBack}
		>
			Zurück
		</button>
		<p class="text-sm text-stone-400">Tippe auf eine Zahl, um weiterzukommen</p>
	</div>
</div>
