import { error } from '@sveltejs/kit';
import { getBlogPost, getBlogPosts } from '#lib/blog/posts.js';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () =>
	getBlogPosts().map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const post = getBlogPost(params.slug);
	if (!post) error(404, 'Artikel nicht gefunden');

	return {
		slug: post.slug,
		metadata: post.metadata
	};
};
