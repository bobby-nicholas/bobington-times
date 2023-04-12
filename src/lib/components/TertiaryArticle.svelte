<script lang="ts">
import type Article from "$lib/models/article";
    import ArticleContainer from "./ArticleContainer.svelte";

export let article: Article;
</script>

<ArticleContainer>
	<a href="/articles/{article.id}">
		{#if article.photo?.src}
		<img class="w-5/12 float-right" src={article.photo.src} alt={article.photo.description} />
		{/if}
		<div class="flex flex-col justify-start">
			<p class="text-neutral-600 text-xs text-left">{article.headline}</p>
			<p class="text-xs text-neutral-500 italic">{article.author}, {new Date(article.published).toDateString()}</p>
		</div>
	</a>
</ArticleContainer>
