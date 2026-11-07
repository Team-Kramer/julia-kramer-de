import type { Answer, Dimension, DimensionResult } from './types';
import { questions } from './questions';

const feedback: Record<Dimension, { high: string; mid: string; low: string }> = {
	organisatorisch: {
		high: 'Du trägst gerade besonders viel von der unsichtbaren Organisationsarbeit. Das ist real – und es hat einen Preis.',
		mid: 'Du übernimmst einen spürbaren Teil der Organisation. Es gibt noch Luft, Verantwortung zu teilen.',
		low: 'Der organisatorische Load scheint momentan eher verteilt zu sein.'
	},
	emotional: {
		high: 'Du hältst emotional sehr viel für andere. Das ist eine Stärke, die oft unsichtbar bleibt und gleichzeitig erschöpft.',
		mid: 'Du nimmst emotional einiges wahr und mit. Achte darauf, dass auch du Raum bekommst.',
		low: 'Der emotionale Load scheint gerade nicht allein bei dir zu liegen.'
	},
	antizipierend: {
		high: 'Dein Kopf arbeitet dauerhaft im Voraus. Das verhindert Chaos – und raubt dir gleichzeitig Ruhe.',
		mid: 'Du denkst ein gutes Stück voraus. Das ist hilfreich, darf aber nicht zum Dauerzustand werden.',
		low: 'Das Vorausdenken liegt momentan nicht hauptsächlich bei dir.'
	}
};

const labels: Record<Dimension, string> = {
	organisatorisch: 'Organisatorisch',
	emotional: 'Emotional',
	antizipierend: 'Antizipierend'
};

export function calculateResults(answers: Answer[]): DimensionResult[] {
	const dimensions: Dimension[] = ['organisatorisch', 'emotional', 'antizipierend'];

	return dimensions.map((dim) => {
		const relevant = questions.filter((q) => q.dimension === dim);
		const values = relevant.map((q) => {
			const a = answers.find((ans) => ans.questionId === q.id);
			return a?.value ?? 0;
		});

		const average = values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0;
		const rounded = Math.round(average * 10) / 10;

		let text = feedback[dim].mid;
		if (rounded >= 3.5) text = feedback[dim].high;
		else if (rounded <= 2.2) text = feedback[dim].low;

		return {
			dimension: dim,
			average: rounded,
			label: labels[dim],
			text
		};
	});
}
