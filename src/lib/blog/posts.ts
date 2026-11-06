import type { Component } from 'svelte';
import { parse as parseYaml } from 'yaml';

export const blogCategories = [
	'Mental Load',
	'Systeme',
	'Paare',
	'Unsichtbare Arbeit',
	'Entscheidungen'
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export interface BlogPostMetadata {
	title: string;
	date: string;
	description: string;
	category: BlogCategory;
	readTime: string;
}

export interface BlogPost {
	slug: string;
	metadata: BlogPostMetadata;
	component: Component;
}

interface MarkdownModule {
	default: Component;
}

const markdownPosts = import.meta.glob<MarkdownModule>('/src/content/blog/*.md', {
	eager: true
});
const rawPosts = import.meta.glob<string>('/src/content/blog/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

function slugFromPath(path: string): string {
	const filename = path.split('/').at(-1);
	if (!filename?.endsWith('.md')) throw new Error(`Unexpected blog post path: ${path}`);
	return filename.slice(0, -3);
}

function parseMetadata(path: string): BlogPostMetadata {
	const raw = rawPosts[path];
	if (!raw) throw new Error(`Missing raw Markdown source for blog post: ${path}`);

	const match = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/.exec(raw);
	if (!match) throw new Error(`Missing YAML frontmatter in blog post: ${path}`);

	const metadata: unknown = parseYaml(match[1]);
	if (!metadata || typeof metadata !== 'object') {
		throw new Error(`Missing frontmatter in blog post: ${path}`);
	}
	const candidate = metadata as Partial<BlogPostMetadata>;
	if (
		typeof candidate.title !== 'string' ||
		!candidate.title.trim() ||
		typeof candidate.description !== 'string' ||
		!candidate.description.trim() ||
		typeof candidate.readTime !== 'string' ||
		!candidate.readTime.trim()
	) {
		throw new Error(`Blog post must include title, description, and readTime: ${path}`);
	}
	if (
		typeof candidate.date !== 'string' ||
		!/^\d{4}-\d{2}-\d{2}$/.test(candidate.date) ||
		Number.isNaN(Date.parse(`${candidate.date}T00:00:00.000Z`)) ||
		new Date(`${candidate.date}T00:00:00.000Z`).toISOString().slice(0, 10) !== candidate.date
	) {
		throw new Error(`Blog post date must use YYYY-MM-DD format: ${path}`);
	}
	if (typeof candidate.category !== 'string' || !blogCategories.includes(candidate.category as BlogCategory)) {
		throw new Error(`Unknown blog category "${candidate.category}" in ${path}`);
	}

	return candidate as BlogPostMetadata;
}

export function getBlogPosts(): BlogPost[] {
	return Object.entries(markdownPosts)
		.map(([path, module]) => {
			return {
				slug: slugFromPath(path),
				metadata: parseMetadata(path),
				component: module.default
			};
		})
		.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
}

export function getBlogPost(slug: string): BlogPost | undefined {
	return getBlogPosts().find((post) => post.slug === slug);
}
