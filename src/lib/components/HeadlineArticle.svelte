<script lang="ts">
import type Article from "$lib/models/article";
    import ArticleContainer from "./ArticleContainer.svelte";

export let article: Article;
export let isPrimary: boolean;

$: headlineSize = isPrimary ? 'sm:text-2xl lg:text-5xl' : 'sm:text-xl lg:text-3xl';
let leadSize = 'text-sm sm:text-base';
let footerSize = 'text-sm sm:text-base';
</script>

<style scoped>.headline-font { font-family: 'Playfair Display SC'; }</style>

<ArticleContainer>
	<div class="border-b-2 border-neutral-100 font-bold headline-font p-1 sm:p-2 {headlineSize}">
		{article.headline}
	</div>
	<a href="/articles/{article.id}">
		{#if article.photo?.src}
		<img class="mx-auto" src={article.photo.src } alt={article.photo.description} />
		{/if}
		<p class="text-left text-neutral-800 p-0.5 sm:p-1 {leadSize}">
			{article.lead}
		</p>
		<div class="border-t-2 border-neutral-100 text-right italic p-1 {footerSize}">
			{article.author}, {new Date(article.published).toDateString()}
		</div>
	</a>
</ArticleContainer>
