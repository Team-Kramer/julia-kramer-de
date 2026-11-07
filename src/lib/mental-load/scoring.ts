import { questions } from './questions';
import type { Answer, Dimension, DimensionResult } from './types';

const dimensionCopy: Record<Dimension, { label: string; text: string }> = {
	organisatorisch: {
		label: 'Organisatorischer Load',
		text: 'Hier geht es um Überblick, Termine, Vorräte und die Verantwortung dafür, dass Dinge rechtzeitig passieren.'
	},
	emotional: {
		label: 'Emotionaler Load',
		text: 'Hier geht es um Stimmungen wahrnehmen, Spannungen abfangen und sich für das Wohlbefinden anderer mitverantwortlich fühlen.'
	},
	antizipierend: {
		label: 'Antizipierender Load',
		text: 'Hier geht es um Vorausdenken, Erinnern und Vorbereiten – auch wenn die eigentliche Aufgabe noch bevorsteht.'
	}
};

const dimensionOrder: Dimension[] = ['organisatorisch', 'emotional', 'antizipierend'];

export function calculateResults(answers: Answer[]): DimensionResult[] {
	const knownQuestionIds = new Set(questions.map((question) => question.id));
	const answerById = new Map<string, number>();

	for (const answer of answers) {
		if (!knownQuestionIds.has(answer.questionId)) {
			throw new Error(`Unknown Mental-Load-Check question: ${answer.questionId}`);
		}
		if (answerById.has(answer.questionId)) {
			throw new Error(`Duplicate answer for question: ${answer.questionId}`);
		}
		if (!Number.isInteger(answer.value) || answer.value < 1 || answer.value > 5) {
			throw new Error(`Answer for ${answer.questionId} must be an integer from 1 to 5`);
		}
		answerById.set(answer.questionId, answer.value);
	}

	const missingQuestion = questions.find((question) => !answerById.has(question.id));
	if (missingQuestion) {
		throw new Error(`Missing answer for question: ${missingQuestion.id}`);
	}

	return dimensionOrder.map((dimension) => {
		const dimensionQuestions = questions.filter((question) => question.dimension === dimension);
		const average =
			dimensionQuestions.reduce((sum, question) => {
				const value = answerById.get(question.id);
				if (value === undefined) {
					throw new Error(`Missing answer for question: ${question.id}`);
				}
				return sum + value;
			}, 0) / dimensionQuestions.length;
		const roundedAverage = Math.round(average * 10) / 10;
		const copy = dimensionCopy[dimension];

		return {
			dimension,
			label: copy.label,
			average: roundedAverage,
			text: copy.text
		};
	});
}
