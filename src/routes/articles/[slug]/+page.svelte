<script lang="ts">
import { marked } from 'marked';
export let data;
$: article = data.article;
</script>

<style>
.headline-font { font-family: 'Playfair Display SC'; }
</style>

<div class="flex justify-center p-1">
	<div class="block w-full max-w-3xl rounded-lg bg-white text-center shadow-lg p-2">
		<div class="border-b-2 border-neutral-100 py-5 text-5xl font-bold headline-font">
			{article.headline}
		</div>
		<img class="rounded-t-sm mx-auto p-1" src={article.photo?.src ?? 'https://placehold.co/600x400' } alt={article.photo?.description} />
		<p class="mb-4 text-left text-xl text-neutral-800 px-4">
			{article.lead}
		</p>
		<p id="article-content" class="mb-4 text-left text-neutral-800 px-4 text-base">
			{@html marked(article.content)}
		</p>
		<div class="border-t-2 border-neutral-100 px-6 py-3 text-right italic">
			{article.author}, {new Date(article.published).toDateString()}
		</div>
	</div>
</div>