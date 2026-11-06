<script lang="ts">
	import { getBlogPosts, blogCategories } from '#lib/blog/posts.js';
	import type { BlogCategory } from '#lib/blog/posts.js';

	const posts = getBlogPosts();
	let selectedCategory = $state<BlogCategory | 'Alle'>('Alle');
	const visiblePosts = $derived(
		selectedCategory === 'Alle'
			? posts
			: posts.filter((post) => post.metadata.category === selectedCategory)
	);
</script>

<svelte:head>
	<title>Denklabor – Mental Load Labor</title>
	<meta
		name="description"
		content="Ehrliche Gedanken und klare Modelle zu Mental Load, unsichtbarer Arbeit, Systemen, Paaren und Entscheidungen."
	/>
	<link rel="canonical" href="https://julia-kramer.de/blog/" />
	<meta property="og:title" content="Denklabor – Mental Load Labor" />
	<meta
		property="og:description"
		content="Ehrliche Gedanken und klare Modelle zu Mental Load, unsichtbarer Arbeit, Systemen, Paaren und Entscheidungen."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<section class="content-page">
	<p class="eyebrow">DENKLABOR</p>
	<h1>Gedanken, die weiterhelfen.</h1>
	<p class="content-lede">
		Keine schnellen Tipps, sondern Modelle und Beobachtungen zu Mental Load, unsichtbarer Arbeit,
		Systemen und Entscheidungen.
	</p>

	<div class="category-list" aria-label="Themen im Denklabor">
		<button
			class="category-chip"
			class:category-chip-selected={selectedCategory === 'Alle'}
			aria-pressed={selectedCategory === 'Alle'}
			onclick={() => (selectedCategory = 'Alle')}
		>Alle</button>
		{#each blogCategories as category}
			<button
				class="category-chip"
				class:category-chip-selected={selectedCategory === category}
				aria-pressed={selectedCategory === category}
				onclick={() => (selectedCategory = category)}
			>{category}</button>
		{/each}
	</div>

	<div class="content-grid">
		{#each visiblePosts as post}
			<article class="content-card">
				<p class="card-index">{post.metadata.category} · {post.metadata.readTime} LESEZEIT</p>
				<h2>{post.metadata.title}</h2>
				<p>{post.metadata.description}</p>
				<p>
					<time datetime={post.metadata.date}>
						{new Date(`${post.metadata.date}T12:00:00`).toLocaleDateString('de-DE', {
							day: 'numeric',
							month: 'long',
							year: 'numeric'
						})}
					</time>
				</p>
				<a class="text-link" href={`/blog/${post.slug}/`}>
					Artikel lesen <span aria-hidden="true">→</span>
				</a>
			</article>
		{:else}
			<p aria-live="polite">
				Zu diesem Thema gibt es noch keinen Artikel. Neue Gedanken erscheinen nach und nach im
				Denklabor.
			</p>
		{/each}
	</div>
</section>
