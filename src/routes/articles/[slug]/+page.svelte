<script lang="ts">
import { marked } from 'marked';
export let data;
$: article = data.article;
let headlineSize = 'text-xl md:text-5xl'
let footerSize = 'text-sm sm:text-base';
</script>

<style>
.headline-font { font-family: 'Playfair Display SC'; }
</style>

<div class="flex justify-center sm:p-1">
	<div class="block w-full max-w-3xl rounded-sm bg-white text-center shadow-sm">
		<div class="border-b-2 border-neutral-100 py-3 px-1 font-bold headline-font {headlineSize}">
			{article.headline}
		</div>
		{#if article.photo?.src}
		<img class="mx-auto pb-2" src={article.photo.src} alt={article.photo.description} />
		{/if}
		<p class="text-left text-lg md:text-xl text-neutral-800 px-1 md:px-4">
			{article.lead}
		</p>
		<p id="article-content" class="text-left text-neutral-800 px-1 md:px-4 text-base">
			{@html marked(article.content)}
		</p>
		<div class="border-t-2 border-neutral-100 text-right italic p-2 {footerSize}">
			{article.author}, {new Date(article.published).toDateString()}
		</div>
	</div>
</div>