<script lang="ts">
	import { getBlogPost } from '#lib/blog/posts.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const Article = $derived(getBlogPost(data.slug)?.component);
</script>

<svelte:head>
	<title>{data.metadata.title} – Denklabor</title>
	<meta name="description" content={data.metadata.description} />
	<link rel="canonical" href={`https://julia-kramer.de/blog/${data.slug}/`} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={`${data.metadata.title} – Denklabor`} />
	<meta property="og:description" content={data.metadata.description} />
	<meta property="article:published_time" content={data.metadata.date} />
	<meta property="article:section" content={data.metadata.category} />
</svelte:head>

<article class="content-page">
	<a class="page-back" href="/blog/">← Zum Denklabor</a>
	<p class="eyebrow">{data.metadata.category} · DENKLABOR</p>
	<h1 class="article-title">{data.metadata.title}</h1>
	<p class="article-meta">
		<time datetime={data.metadata.date}>
			{new Date(`${data.metadata.date}T12:00:00`).toLocaleDateString('de-DE', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})}
		</time>
		· {data.metadata.readTime} Lesezeit
	</p>
	<div class="prose markdown-content">
		{#if Article}
			<Article />
		{:else}
			<p>Der Artikel konnte nicht geladen werden.</p>
		{/if}
	</div>
</article>
