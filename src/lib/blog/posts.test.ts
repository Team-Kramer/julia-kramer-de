import { describe, expect, it } from 'vitest';
import { blogCategories, getBlogPost, getBlogPosts } from './posts';

describe('blog posts', () => {
	it('loads statically authored Markdown posts with all editorial categories', () => {
		const posts = getBlogPosts();

		expect(blogCategories).toEqual([
			'Mental Load',
			'Systeme',
			'Paare',
			'Unsichtbare Arbeit',
			'Entscheidungen'
		]);
		expect(posts.length).toBeGreaterThan(0);
		expect(posts[0].metadata.title).toBe('Mental Load ist mehr als eine To-do-Liste');
		expect(getBlogPost(posts[0].slug)).toEqual(posts[0]);
	});

	it('returns no article for an unknown slug', () => {
		expect(getBlogPost('gibt-es-nicht')).toBeUndefined();
	});
});
