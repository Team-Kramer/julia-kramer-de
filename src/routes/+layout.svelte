<script lang="ts">
	import { page } from '$app/state';
	import './layout.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<meta name="theme-color" content="#F7F3EB" />
	<meta property="og:site_name" content="Mental Load Labor – Julia Kramer" />
	<meta property="og:locale" content="de_DE" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<a class="skip-link" href="#main-content">Zum Inhalt springen</a>

<header class="site-header">
	<div class="site-header-inner page-width">
		<a class="brand" href="/" aria-label="Julia Kramer – Mental Load Labor, Startseite">
			<span class="brand-mark" aria-hidden="true">JK</span>
			<span class="brand-copy">
				<strong>Julia Kramer</strong>
				<small>Mental Load Labor</small>
			</span>
		</a>
		<nav class="site-nav" aria-label="Hauptnavigation">
			<a
				href="/werkzeuge/"
				aria-current={page.url.pathname.startsWith('/werkzeuge') ? 'page' : undefined}
			>Werkzeuge</a>
			<a href="/blog/" aria-current={page.url.pathname.startsWith('/blog') ? 'page' : undefined}>
				Denklabor
			</a>
			<a href="/ueber/" aria-current={page.url.pathname === '/ueber/' ? 'page' : undefined}>
				Über Julia
			</a>
			<a class="nav-cta" href="/begleitung/">Tiefer einsteigen <span aria-hidden="true">↗</span></a>
		</nav>
	</div>
</header>

<main id="main-content">
	{@render children()}
</main>

<footer class="site-footer">
	<div class="page-width footer-inner">
		<a class="brand footer-brand" href="/">
			<span class="brand-mark" aria-hidden="true">JK</span>
			<span class="brand-copy">
				<strong>Julia Kramer</strong>
				<small>Klarheit im Kopf – mit Systemen statt Willenskraft.</small>
			</span>
		</a>
		<div class="footer-meta">
			<p>Ein offenes Labor für weniger Mental Load und mehr geteilte Verantwortung.</p>
			<a href="/werkzeuge/mental-load-check/">Mental-Load-Check starten <span aria-hidden="true">→</span></a>
			<a href="/impressum/">Impressum</a>
			<a href="/datenschutz/">Datenschutz</a>
			<span class="footer-copyright">© {new Date().getFullYear()} Julia Kramer</span>
		</div>
	</div>
</footer>
