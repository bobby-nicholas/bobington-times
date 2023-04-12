<script lang="ts">
import type Article from "$lib/models/article";

export let article: Article;

let headlineSize = 'text-sm sm:text-lg';
let leadSize = 'text-sm sm:text-lg';
</script>

<style scoped>.headline-font { font-family: 'Playfair Display SC'; }</style>

<div class="flex justify-center w-full p-1">
	<div class="block w-full max-w-full rounded-lg bg-white text-center shadow-lg p-2">
		<a href="/articles/{article.id}">
			{#if article.photo?.src}
			<img class="rounded-t-sm mx-auto sm:py-6" src={article.photo.src} alt={article.photo.description} />
			{/if}
			<div class="border-b-2 border-neutral-100 sm:py-4 py-1">
				<p class="{headlineSize} font-bold headline-font pb-3">{article.headline}</p>
				<p class="mb-2 text-left {leadSize} text-neutral-800">
					{article.lead}
				</p>
			</div>
		</a>
		<div class="border-t-2 border-neutral-100 p-2 text-right italic">
			{article.author}, {new Date(article.published).toDateString()}
		</div>
	</div>
</div>
	