<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { slide } from 'svelte/transition';
	let [logoSize, showNav] = ['h-11 sm:h-14 md:h-18', true];
	let previousY = 0;
	const threshold = 150;
	onMount(() => window.addEventListener('scroll', () => {
		if (Math.abs(window.scrollY - previousY) > threshold) {
			[logoSize, showNav] = (window.scrollY > previousY) ? ['h-9 sm:11 md:13', false] : ['h-11 sm:h-14 md:h-18', true];
			previousY = window.scrollY;
		}
	}));
</script>

<header class="w-full bg-white sticky top-0 left-0 z-50 shadow-md">
	<div class="container mx-auto px-4 py-2">
		<div class="flex items-center justify-center">
			<a href="/">
				<svg viewBox="0 0 800 150" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-all duration-1000 ease-in-out {logoSize}">
					<text font-family="'Cinzel Decorative', serif" x="400" y="75" text-anchor="middle" alignment-baseline="middle" font-size="3rem" fill="black">
						The Bobington Times
					</text>
				</svg>
			</a>
		</div>
		<!-- {#if showNav}
		<nav class="mt-4 text-center" transition:slide={{duration:500}}>
			<a href="/" class="mx-4 text-gray-700 hover:text-gray-900 transition-colors duration-300">
				Home
			</a>
			<a href="/" class="mx-4 text-gray-700 hover:text-gray-900 transition-colors duration-300">
				News
			</a>
			<a href="/" class="mx-4 text-gray-700 hover:text-gray-900 transition-colors duration-300">
				Features
			</a>
		</nav>
		{/if} -->
	</div>
</header>
<div class="container mx-auto px-4">
	<slot />
</div>
