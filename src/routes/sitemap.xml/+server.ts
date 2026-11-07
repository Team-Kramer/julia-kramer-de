import { getBlogPosts } from '#lib/blog/posts.js';

export const prerender = true;

const publicRoutes = [
	'',
	'/werkzeuge/',
	'/werkzeuge/mental-load-check/',
	'/blog/',
	'/ueber/',
	'/begleitung/',
	'/impressum/',
	'/datenschutz/'
];

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export function GET() {
	const urls = [
		...publicRoutes.map((route) => ({
			loc: `https://julia-kramer.de${route}`,
			lastmod: undefined
		})),
		...getBlogPosts().map((post) => ({
			loc: `https://julia-kramer.de/blog/${post.slug}/`,
			lastmod: post.metadata.date
		}))
	];
	const entries = urls
		.map(
			({ loc, lastmod }) =>
				`<url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ''}</url>`
		)
		.join('');
	const body =
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		entries +
		'</urlset>';

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
