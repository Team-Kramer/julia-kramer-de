<script lang="ts">
	import type { Question } from '#lib/mental-load/types.js';

	interface Props {
		question: Question;
		currentValue: number | null;
		onAnswer: (value: number) => void;
	}

	let { question, currentValue, onAnswer }: Props = $props();
	const scale = [1, 2, 3, 4, 5];
</script>

<fieldset class="answer-group">
	<legend>{question.text}</legend>
	<div class="answer-scale" aria-describedby={`${question.id}-scale-hint`}>
		{#each scale as value}
			<label class="answer-option" class:answer-option-selected={currentValue === value}>
				<input
					type="radio"
					name={`answer-${question.id}`}
					value={value}
					checked={currentValue === value}
					onchange={() => onAnswer(value)}
				/>
				<span>{value}</span>
			</label>
		{/each}
	</div>
	<div class="scale-hint" id={`${question.id}-scale-hint`}>
		<span>trifft gar nicht zu</span>
		<span>trifft voll zu</span>
	</div>
</fieldset>
