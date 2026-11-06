export type Dimension = 'organisatorisch' | 'emotional' | 'antizipierend';

export interface Question {
	id: string;
	text: string;
	dimension: Dimension;
}

export interface Answer {
	questionId: string;
	value: number; // 1–5
}

export interface DimensionResult {
	dimension: Dimension;
	average: number;
	label: string;
	text: string;
}
