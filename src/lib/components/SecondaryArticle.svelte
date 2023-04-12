<script lang="ts">
import type Article from "$lib/models/article";
    import ArticleContainer from "./ArticleContainer.svelte";

export let article: Article;

let headlineSize = 'text-sm sm:text-lg lg:text-base';
let leadSize = 'text-sm sm:text-base';
let footerSize = 'text-sm sm:text-base lg:text-xs';
</script>

<style scoped>.headline-font { font-family: 'Playfair Display SC'; }</style>

<ArticleContainer>
	<a href="/articles/{article.id}">
		{#if article.photo?.src}
		<img class="mx-auto" src={article.photo.src} alt={article.photo.description} />
		{/if}
		<div class="border-b-2 border-neutral-100">
			<p class="{headlineSize} font-bold headline-font p-1 sm:p-2 lg:p-1">{article.headline}</p>
			<p class="text-left {leadSize} text-neutral-800 p-0.5 sm:p-1">
				{article.lead}
			</p>
		</div>
	</a>
	<div class="border-t-2 border-neutral-100 text-right italic p-1 {footerSize}">
		{article.author}, {new Date(article.published).toDateString()}
	</div>
</ArticleContainer>