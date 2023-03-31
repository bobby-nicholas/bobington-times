<style>
.grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-auto-rows: min-content;
	grid-gap: 1rem;
}
</style>
<script>
export let data;
</script>


<h1 class="text-3xl pb-4">Bobington Times</h1>

<div class="grid-container">
	{#each data.articles as article (article.id)}
	<div class="bg-white shadow-md rounded p-4 mb-6">
		<h2 class="font-bold text-xl mb-2">{article.headline}</h2>
		<p class="text-gray-700">{article.text}</p>
	</div>
	{/each}
</div>
