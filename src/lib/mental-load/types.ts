export const dimensions = ['organisatorisch', 'emotional', 'antizipierend'] as const;

export type Dimension = (typeof dimensions)[number];

export interface Question {
	id: string;
	text: string;
	dimension: Dimension;
}

export interface Answer {
	questionId: string;
	value: number;
}

export interface DimensionResult {
	dimension: Dimension;
	label: string;
	average: number;
	text: string;
}
