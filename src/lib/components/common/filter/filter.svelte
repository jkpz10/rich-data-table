<script>
	const options = ['city', 'country'];
	let isOpen = $state(false);
</script>

<!-- filter -->
<div class="">
	<button
		id="dropdownRadioButton"
		data-dropdown-toggle="dropdownRadio"
		class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
		type="button"
		onclick={() => (isOpen = !isOpen)}
	>
		Filter
		<svg
			class="w-2.5 h-2.5 ms-2.5"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 10 6"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m1 1 4 4 4-4"
			/>
		</svg>
	</button>
	<!-- Dropdown menu -->
	{#if isOpen}
		<div
			id="dropdownRadio"
			class="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
			style="position: absolute; inset: auto; transform: translate3d(-104px, 8px, 0px);"
		>
			<ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioButton">
				{#each options as option, index}
					<li>
						<div class="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
							<input
								id="filter-{option}-{index}"
								type="radio"
								value=""
								name="filter-radio"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
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
