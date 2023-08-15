<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: industries = data?.industries;

	$: popularInustries = data?.industries.filter((industry) => industry?.isPopular === true);

	let selectedIndustry = '';

	let searchKeyword = '';

	let isOpen = false;

	let submitModal = false;

	$: filteredIndustries = industries?.filter((industry) => {
		const lowerSearchKeyword = searchKeyword.toLowerCase();

		if (industry.name.toLowerCase().includes(lowerSearchKeyword)) {
			return true;
		}

		const matchingServices = industry?.services.filter((service) =>
			service.name.toLowerCase().includes(lowerSearchKeyword)
		);
		if (matchingServices.length > 0) {
			return true;
		}

		const matchingSynonyms = industry?.synonyms.filter((synonym) =>
			synonym.toLowerCase().includes(lowerSearchKeyword)
		);
		if (matchingSynonyms.length > 0) {
			return true;
		}

		return false;
	});

	function toggleIndustrySelection(name: string) {
		if (selectedIndustry === name) {
			searchKeyword = '';
			selectedIndustry = '';
		} else {
			selectedIndustry = name;
			searchKeyword = name;
		}
	}
</script>

<div class="flex h-screen">
	<div class="w-1/2 hidden lg:block">
		<img src="./voolt-bg.png" alt="background" class="h-full w-full object-cover" />
	</div>

	<div
		class="w-full lg:w-1/2 py-4 lg:py-10 px-8 lg:px-20 flex flex-col justify-between bg-base-100"
	>
		<nav>
			<img src="./voolt-logo.svg" alt="logo" class="w-20 lg:w-36" />
		</nav>

		<div class="flex flex-col gap-6 relative mt-20 lg:mt-0 max-w-xl mx-auto">
			<h1 class="text-3xl lg:text-4xl font-semibold max-w-lg">
				What type of business is the website for?
			</h1>

			<div class="relative">
				<img src="/search-icon.svg" alt="search-icon" class="absolute top-3 z-10 left-3" />
				<input
					type="text"
					class="input input-bordered join-item w-full pl-10"
					placeholder="Search for your industry"
					aria-invalid="false"
					bind:value={searchKeyword}
					on:focus={() => (isOpen = true)}
					on:blur={() => (isOpen = false)}
				/>
				<img src="/nav-arrow.svg" alt="search-icon" class="absolute top-3 right-3" />
			</div>

			{#if isOpen}
				<ul
					class="max-h-80 bg-base-100 overflow-y-auto border rounded-lg absolute w-full top-40 cursor-pointer"
				>
					{#if filteredIndustries.length > 0}
						{#each filteredIndustries as industry}
							<li>
								<button
									on:mousedown={() => {
										toggleIndustrySelection(industry.name);
									}}
									class="hover:bg-blue-500/90 w-full text-left hover:text-white px-3 py-2"
								>
									{industry.name}
								</button>
							</li>
						{/each}
					{:else}
						<p class="px-3 py-2 text-center max-w-md mx-auto">
							<img src="./not-found.svg" alt="not-found" class="mx-auto my-2" />
							Oops... We can't find similar service in our list. Try another keyword to search
						</p>
					{/if}
				</ul>
			{/if}

			<div>
				<b>Or select from most popular:</b>

				<div
					class="flex flex-wrap mt-4 gap-2 max-h-64 overflow-y-auto lg:overflow-visible py-2 px-1 lg:p-0"
				>
					{#each popularInustries as industry}
						<button
							class="px-3 py-1 text-sm border-gray-300 border rounded-md hover:scale-105 active:scale-95 transition"
							class:selected-industry={selectedIndustry === industry.name}
							on:click={() => toggleIndustrySelection(industry.name)}
						>
							{industry.name}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<button
			on:click={() => (submitModal = !submitModal)}
			class="btn btn-wide btn-primary mx-auto mb-4">Submit</button
		>
	</div>
</div>

<div class="modal" class:modal-open={submitModal && selectedIndustry}>
	<div
		class="relative w-full h-full lg:w-2/4 lg:h-auto p-8 shadow border-b lg:rounded-box bg-base-100 flex flex-col text-center items-center lg:max-w-xl"
	>
		<button
			on:click={() => (submitModal = !submitModal)}
			class="btn btn-ghost btn-circle absolute top-1 right-2">X</button
		>
		<h5 class="font-bold text-2xl mt-4 mb-10">Chosen Industry:</h5>
		<span class="font-bold underline">
			{selectedIndustry}
		</span>
	</div>
</div>

<style lang="postcss">
	.selected-industry {
		@apply bg-blue-100 border border-blue-600;
	}

	input:focus {
		outline: 1px solid blue;
	}
</style>
