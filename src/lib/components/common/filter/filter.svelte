<script lang="ts">
	type FilterProps = {
		title: string;
		onSelect: (value: string | '') => void;
		options: String[];
	};
	let { title, onSelect, options }: FilterProps = $props();
	let isOpen = $state(false);
	let selectedOptions = $state<string[]>([]);

	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const value = target.value;

		if (target.checked) {
			selectedOptions = [...selectedOptions, value];
		} else {
			selectedOptions = selectedOptions.filter((option) => option !== value);
		}

		onSelect(value);
	};

	const isOptionChecked = (option: string) => selectedOptions.includes(option);
</script>

<!-- filter -->
<div class="">
	<button
		id="dropdownRadioButton"
		data-dropdown-toggle="dropdownRadio"
		class="flex gap-1 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2"
		type="button"
		onclick={() => (isOpen = !isOpen)}
	>
		{title}
		<svg width="21" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
				stroke="#344054"
				stroke-width="1.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
	<!-- Dropdown menu -->
	{#if isOpen}
		<!-- svelte-ignore a11y_no_static_element_interactions -->

		<div
			onmouseleave={() => (isOpen = !isOpen)}
			id="dropdownRadio"
			class="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
			style="position: absolute; inset: auto; transform: translate3d(0, 10px, 0px)"
		>
			<ul
				class="p-3 space-y-1 text-sm text-gray-700 max-h-[300px] overflow-auto"
				aria-labelledby="dropdownRadioButton"
			>
				{#each options as option, index}
					<li>
						<div class="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
							<input
								id="filter-{option}-{index}"
								type="checkbox"
								value={option}
								name="filter-radio"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
								onchange={handleChange}
								checked={isOptionChecked(`${option}`)}
							/>
							<label
								for="filter-{option}-{index}"
								class="w-full ms-2 text-sm font-medium text-gray-900 rounded">{option}</label
							>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
