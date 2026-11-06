<script lang="ts">
	import type { Question } from '$lib/mental-load/types';

	interface Props {
		question: Question;
		currentValue?: number;
		onAnswer: (value: number) => void;
	}

	let { question, currentValue, onAnswer }: Props = $props();

	const scale = [1, 2, 3, 4, 5];
</script>

<div class="space-y-6">
	<p class="text-xl leading-relaxed text-stone-800">
		{question.text}
	</p>

	<div class="flex justify-between gap-2">
		{#each scale as value}
			<button
				type="button"
				class="flex-1 aspect-square max-w-14 rounded-xl border text-lg font-medium transition-all
					{currentValue === value
					? 'border-teal-800 bg-teal-800 text-white'
					: 'border-stone-300 bg-white text-stone-700 hover:border-teal-700 hover:bg-teal-50'}"
				onclick={() => onAnswer(value)}
				aria-label="Bewertung {value}"
			>
				{value}
			</button>
		{/each}
	</div>

	<div class="flex justify-between text-xs text-stone-400 px-1">
		<span>trifft gar nicht zu</span>
		<span>trifft voll zu</span>
	</div>
</div>
