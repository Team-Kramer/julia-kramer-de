<script lang="ts">
	import { page } from '$app/state';

	const title = $derived(page.status === 404 ? 'Diese Seite gibt es hier nicht.' : 'Das hat nicht geklappt.');
</script>

<svelte:head>
	<title>{page.status} – Mental Load Labor</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="content-page">
	<p class="eyebrow">{page.status}</p>
	<h1>{title}</h1>
	<p class="content-lede">
		Der gesuchte Inhalt ist vielleicht umgezogen. Von hier findest du zurück ins Labor.
	</p>
	<a class="button button-primary" href="/">Zur Startseite <span aria-hidden="true">→</span></a>
</section>
