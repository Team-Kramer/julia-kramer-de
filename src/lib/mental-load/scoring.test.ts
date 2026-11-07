import { describe, expect, it } from 'vitest';
import { questions, questionnaireVersion } from './questions';
import { calculateResults } from './scoring';
import type { Answer } from './types';

function answersWith(valueFor: (questionId: string) => number): Answer[] {
	return questions.map(({ id }) => ({ questionId: id, value: valueFor(id) }));
}

describe('calculateResults', () => {
	it('uses the expected versioned questionnaire structure', () => {
		expect(questionnaireVersion).toBe('mental-load-check-v1');
		expect(questions).toHaveLength(15);
		expect(questions.filter(({ dimension }) => dimension === 'organisatorisch')).toHaveLength(5);
		expect(questions.filter(({ dimension }) => dimension === 'emotional')).toHaveLength(5);
		expect(questions.filter(({ dimension }) => dimension === 'antizipierend')).toHaveLength(5);
	});

	it('returns one result per dimension in a stable order', () => {
		const results = calculateResults(answersWith(() => 3));

		expect(results.map(({ dimension }) => dimension)).toEqual([
			'organisatorisch',
			'emotional',
			'antizipierend'
		]);
		expect(results.map(({ average }) => average)).toEqual([3, 3, 3]);
	});

	it('calculates independent averages for each dimension and rounds to one decimal', () => {
		const results = calculateResults(
			answersWith((questionId) => (['q1', 'q2', 'q3', 'q4', 'q5'].includes(questionId) ? 4 : 2))
		);

		expect(results.map(({ average }) => average)).toEqual([4, 2, 2]);
	});

	it('keeps reflection copy descriptive instead of classifying averages', () => {
		const lowerAnswers = calculateResults(answersWith(() => 1));
		const higherAnswers = calculateResults(answersWith(() => 5));

		expect(lowerAnswers.map(({ text }) => text)).toEqual(higherAnswers.map(({ text }) => text));
		expect(lowerAnswers[0].text).toContain('Überblick, Termine, Vorräte');
	});

	it('rejects incomplete answers instead of interpreting them as zero', () => {
		const incomplete = answersWith(() => 3).slice(0, -1);

		expect(() => calculateResults(incomplete)).toThrow('Missing answer for question');
	});

	it('rejects duplicate and unknown question answers', () => {
		const complete = answersWith(() => 3);

		expect(() => calculateResults([...complete, complete[0]])).toThrow('Duplicate answer');
		expect(() =>
			calculateResults([...complete.slice(0, -1), { questionId: 'unknown', value: 3 }])
		).toThrow('Unknown Mental-Load-Check question');
	});

	it.each([0, 6, 2.5])('rejects invalid response value %s', (value) => {
		const complete = answersWith(() => 3);
		complete[0] = { questionId: questions[0].id, value };

		expect(() => calculateResults(complete)).toThrow('must be an integer from 1 to 5');
	});
});
