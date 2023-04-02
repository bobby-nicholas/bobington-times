<script lang="ts">
import type Article from "$lib/models/article";

export let article: Article;
</script>

<style>.headline-font { font-family: 'Playfair Display SC'; }</style>

<div class="flex justify-center w-full p-2">
	<div class="block w-full max-w-full rounded-lg bg-white text-center shadow-lg p-2">
		<a href="/">
			<img class="rounded-t-sm mx-auto py-6" src={article.photo ?? 'https://placehold.co/600x400' } alt={article.headline} />
			<div class="border-b-2 border-neutral-100 py-4">
				<p class="text-xl font-bold headline-font pb-3">{article.headline}</p>
				<p class="mb-4 text-left text-xl text-neutral-800">
					{article.text}
				</p>
			</div>
		</a>
		<div class="border-t-2 border-neutral-100 px-6 py-3 text-right italic">
			{article.author}, {new Date(article.published).toDateString()}
		</div>
	</div>
</div>
	