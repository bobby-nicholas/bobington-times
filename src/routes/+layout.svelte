<script>
	import { onMount } from 'svelte';
	import '../app.css';

	let logoSize = 'h-16';
	let previousY = 0;
	const threshold = 40;
	onMount(() => window.addEventListener('scroll', () => {
		if (Math.abs(window.scrollY - previousY) > threshold) {
			logoSize = (window.scrollY > previousY) ? 'h-12' : 'h-16';
			previousY = window.scrollY;
		}
	}));
</script>

<header class="w-full bg-white sticky top-0 left-0 z-50 shadow-md">
	<div class="container mx-auto px-4 py-2">
		<div class="flex items-center justify-center">
			<img
				src="https://placehold.co/600x200"
				alt="Bobington Times Logo"
				class="transition-all duration-800 ease-in-out {logoSize}"
			/>
		</div>
		<nav class="mt-4 text-center">
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
	</div>
</header>
<div class="container mx-auto px-4">
	<slot />
</div>