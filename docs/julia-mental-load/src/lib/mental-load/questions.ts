import type { Question } from './types';

export const questions: Question[] = [
	// Organisatorischer Load
	{
		id: 'q1',
		text: 'Ich behalte den Überblick über Termine, To-dos und Fristen der anderen im Haushalt.',
		dimension: 'organisatorisch'
	},
	{
		id: 'q2',
		text: 'Ich merke meist als Erste/r, wenn etwas im Haushalt fehlt oder nachbestellt werden muss.',
		dimension: 'organisatorisch'
	},
	{
		id: 'q3',
		text: 'Ich plane im Kopf bereits die nächste Mahlzeit oder den nächsten Tag, während der aktuelle noch läuft.',
		dimension: 'organisatorisch'
	},
	{
		id: 'q4',
		text: 'Ich organisiere Arzttermine, Schule, Freizeit und Behördengänge für mehrere Personen.',
		dimension: 'organisatorisch'
	},
	{
		id: 'q5',
		text: 'Wenn etwas schiefgeht (vergessener Termin, leerer Kühlschrank), fühle ich mich verantwortlich.',
		dimension: 'organisatorisch'
	},

	// Emotionaler Load
	{
		id: 'q6',
		text: 'Ich achte darauf, dass die Stimmung im Haushalt stimmt und greife ein, wenn Spannung entsteht.',
		dimension: 'emotional'
	},
	{
		id: 'q7',
		text: 'Ich spüre oft die Bedürfnisse und Stimmungen der anderen, bevor sie ausgesprochen werden.',
		dimension: 'emotional'
	},
	{
		id: 'q8',
		text: 'Ich überlege häufig, wie ich etwas sagen muss, damit niemand verletzt oder überfordert ist.',
		dimension: 'emotional'
	},
	{
		id: 'q9',
		text: 'Ich fühle mich verantwortlich dafür, dass es allen gut geht.',
		dimension: 'emotional'
	},
	{
		id: 'q10',
		text: 'Nach Konflikten oder anstrengenden Tagen bin ich die Person, die als Erste wieder „funktioniert“.',
		dimension: 'emotional'
	},

	// Antizipierender Load
	{
		id: 'q11',
		text: 'Ich denke mehrere Schritte im Voraus, damit andere nicht in Schwierigkeiten geraten.',
		dimension: 'antizipierend'
	},
	{
		id: 'q12',
		text: 'Ich habe im Kopf eine laufende Liste mit Dingen, die „irgendwann“ erledigt werden müssen.',
		dimension: 'antizipierend'
	},
	{
		id: 'q13',
		text: 'Ich bereite Dinge vor, damit andere sie reibungslos nutzen können (Kleidung, Unterlagen, Essen…).',
		dimension: 'antizipierend'
	},
	{
		id: 'q14',
		text: 'Ich mache mir Gedanken darüber, was passieren könnte, wenn ich etwas nicht plane oder erinnere.',
		dimension: 'antizipierend'
	},
	{
		id: 'q15',
		text: 'Auch in ruhigen Momenten läuft in meinem Kopf eine Art Hintergrund-Organisation.',
		dimension: 'antizipierend'
	}
];
