<script lang="ts">
import type Article from "$lib/models/article";

export let article: Article;
</script>

<div class="flex justify-center p-2 w-full">
	<div class="flex flex-col rounded-lg bg-white shadow-lg min-w-full">
		<a href="/">
			<img class="rounded-t-sm w-5/12 float-right p-2" src={article.photo ?? 'https://placehold.co/150x100' } alt={article.headline} />
			<div class="flex flex-col justify-start p-6">
				<p class="mb-4 text-base text-neutral-600">{article.headline}</p>
				<p class="text-xs text-neutral-500">{article.author}, {new Date(article.published).toDateString()}</p>
			</div>
		</a>
	</div>
</div>
