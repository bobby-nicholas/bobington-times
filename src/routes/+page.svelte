<script>
    import HeadlineArticle from "$lib/components/HeadlineArticle.svelte";
    import SecondaryArticle from "$lib/components/SecondaryArticle.svelte";
    import TertiaryArticle from "$lib/components/TertiaryArticle.svelte";
	export let data;
</script>

<div class="container mx-auto">
	<div class="flex flex-col lg:flex-row">
		<div class="w-full order-2 lg:order-1 lg:w-3/12 p2">
			{#each data.articles as article }
				<SecondaryArticle {article} />
			{/each}
		</div>
		<div class="w-full order-1 lg:order-2 lg:w-6/12 p2">
			{#each data.articles as article, index }
				<HeadlineArticle {article} isPrimary={index == 0} />
			{/each}
		</div>
		<div class="w-full order-3 lg:order-3 lg:w-3/12 p2">
			{#each data.articles as article }
				<TertiaryArticle {article} />
			{/each}
			{#each data.articles as article }
				<TertiaryArticle {article} />
			{/each}
			{#each data.articles as article }
				<TertiaryArticle {article} />
			{/each}
			{#each data.articles as article }
				<TertiaryArticle {article} />
			{/each}
			{#each data.articles as article }
				<TertiaryArticle {article} />
			{/each}
		</div>
	</div>	
</div>
