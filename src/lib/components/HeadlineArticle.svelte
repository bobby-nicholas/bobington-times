<script lang="ts">
import type Article from "$lib/models/article";

export let article: Article;
export let isPrimary: boolean;

$: headlineSize = isPrimary ? 'sm:text-2xl lg:text-5xl' : 'sm:text-xl lg:text-3xl';
let leadSize = 'text-sm sm:text-xl';
let footerSize = 'text-sm sm:text-base';
</script>

<style scoped>.headline-font { font-family: 'Playfair Display SC'; }</style>

<div class="flex justify-center w-full p-1">
	<div class="block w-full max-w-full rounded-lg bg-white text-center shadow-lg p-2">
		<div class="border-b-2 border-neutral-100 py-5 font-bold headline-font {headlineSize}">
			{article.headline}
		</div>
		<a href="/articles/{article.id}">
			{#if article.photo?.src}
			<img class="rounded-t-sm mx-auto sm:p-1" src={article.photo.src } alt={article.photo.description} />
			{/if}
			<p class="mb-4 text-left text-neutral-800 sm:p-2 {leadSize}">
				{article.lead}
			</p>
			<div class="border-t-2 border-neutral-100 p-2 text-right italic {footerSize}">
				{article.author}, {new Date(article.published).toDateString()}
			</div>
		</a>
	</div>
</div>
