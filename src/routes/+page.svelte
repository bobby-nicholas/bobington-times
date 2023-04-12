<script lang="ts">
import chunk from 'lodash.chunk';
import sortBy from 'lodash.sortby';
import reverse from 'lodash.reverse';
import HeadlineArticle from "$lib/components/HeadlineArticle.svelte";
import SecondaryArticle from "$lib/components/SecondaryArticle.svelte";
import TertiaryArticle from "$lib/components/TertiaryArticle.svelte";
import type Article from '$lib/models/article.js';
export let data;
$: articles = data.articles as Article[];
$: chunks = !!articles ? chunk(reverse(sortBy(articles, ['published', (a) => a.content.length])), Math.ceil(articles.length/3)) : [[],[],[]];
$: primaryArticles = chunks[0];
$: secondaryArticles = chunks[1];
$: tertiaryArticles = chunks[2];
</script>

<div class="flex flex-col lg:flex-row">
	<div class="w-full order-2 lg:order-1 lg:w-3/12">
		{#each secondaryArticles as article }
		<SecondaryArticle {article} />
		{/each}
	</div>
	<div class="w-full order-1 lg:order-2 lg:w-6/12">
		{#each primaryArticles as article, index }
		<HeadlineArticle {article} isPrimary={index == 0} />
		{/each}
	</div>
	<div class="w-full order-3 lg:order-3 lg:w-3/12">
		{#each tertiaryArticles as article }
		<TertiaryArticle {article} />
		{/each}
	</div>
</div>	
