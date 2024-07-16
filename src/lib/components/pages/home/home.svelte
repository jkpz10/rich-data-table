<script lang="ts" `>
	import {
		TableHandler,
		Datatable,
		ThSort,
		Th,
		RowsPerPage,
		RowCount,
		Pagination,
		check
	} from '@vincjo/datatables';
	import { Filter, SkeletonTable, Search } from '$lib/components/common';
	import { Button, Modal } from 'flowbite-svelte';
	import {
		dataStore,
		loadingStore,
		errorStore,
		fetchData,
		type FetchUserVaribles
	} from '$lib/store/fetchUserData';
	import { onMount } from 'svelte';
	import type { listItem, apiRes } from '$lib/components/pages/home/types';

	let list: listItem[] = [];
	let loading = $state(true);
	let error: string | null = $state(null);
	let table = $state(new TableHandler<listItem>());
	let cityOptions: string[] = $state([]);
	let countryOptions: string[] = $state([]);
	let filterCity: any;
	let filterCountry: any;
	let search: any = $state();
	let showFilter = $state(false);

	let variables: FetchUserVaribles = {
		page: 1,
		limit: 100,
		seed: ''
	};

	const handleFilterCity = (value: string | '') => {
		filterCity.set(value);
	};
	const handleFilterCountry = (value: string | '') => {
		filterCountry.set(value);
	};

	onMount(() => {
		fetchData(variables);
		const unsubscribeDataStore = dataStore.subscribe((value: apiRes | null) => {
			if (!value?.results.length) return; // Early return if got null on list

			const formattedList: listItem[] = value.results.map((item) => ({
				id: window.crypto.randomUUID(),
				first_name: item.name.first,
				last_name: item.name.last,
				city: item.location.city,
				country: item.location.country
			}));

			list = formattedList;
			cityOptions = [...new Set(formattedList.map((item) => item.city))];
			countryOptions = [...new Set(formattedList.map((item) => item.country))];
			table = new TableHandler<listItem>(list, { rowsPerPage: 10, selectBy: 'id' });
			filterCity = table.createAdvancedFilter('city', check.isEqualTo);
			filterCountry = table.createAdvancedFilter('country', check.isEqualTo);
			search = table.createSearch(['first_name', 'last_name']);
		});

		const unsubscribeLoadingStore = loadingStore.subscribe((value) => {
			loading = value;
		});

		const unsubscribeErrorStore = errorStore.subscribe((value) => {
			error = value;
		});

		return () => {
			unsubscribeDataStore();
			unsubscribeLoadingStore();
			unsubscribeErrorStore();
		};
	});
</script>

<div class="max-w-6xl mx-auto py-14 flex flex-col gap-8">
	<div class="text-center flex flex-col items-center justify-center">
		<h2 class="text-6xl font-semibold">Feature-Rich Data Table in SvelteKit 5</h2>
		<p class="text-xl max-w-[80%]">
			A data table with sorting, checkbox selection, search, filtering, pagination, and
			loading/error states using SvelteKit 5 and Tailwind CSS.
		</p>
	</div>
	<!-- table render here -->
	{#if loading}
		<SkeletonTable />
	{:else if error}
		<div class="w-full border border-red-500 bg-red-200 rounded-md p-4">
			<p>{error}</p>
		</div>
	{:else}
		<div class="flex gap-2 w-full">
			<div class="relative overflow-x-auto shadow-md rounded-md w-full pt-4 border items-center">
				<Datatable {table}>
					{#snippet header()}
						<div class="flex w-full justify-between items-center">
							<div class="px-4">
								<p class="text-lg font-semibold">User</p>
							</div>
							<div class="flex items-center justify-end gap-2 px-4">
								<Search {search} setValue={() => search.set()} />
								<button
									id="dropdownRadioButton"
									data-dropdown-toggle="dropdownRadio"
									class="flex gap-1 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2"
									type="button"
									onclick={() => (showFilter = !showFilter)}
								>
									Filter
									<svg
										width="21"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
											stroke="#344054"
											stroke-width="1.66667"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</button>
							</div>
						</div>
					{/snippet}
					{#snippet footer()}
						<div class="w-full flex justify-between items-center">
							<div class="flex items-center gap-2">
								<RowsPerPage {table} />
								<RowCount {table} />
							</div>

							<Pagination {table} />
						</div>
					{/snippet}

					<table class="w-full text-sm text-left rtl:text-right text-gray-500">
						<thead class="text-xs text-gray-700 bg-[#F9FAFB]">
							<tr>
								<Th>
									<input
										id="checkbox-all-search"
										class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
										type="checkbox"
										checked={table.isAllSelected}
										onclick={() => table.selectAll({ scope: 'all' })}
									/>
									<label for="checkbox-all-search" class="sr-only">checkbox</label>
								</Th>
								<ThSort {table} field="first_name">First Name</ThSort>
								<ThSort {table} field="last_name">Last Name</ThSort>
								<ThSort {table} field="city">City</ThSort>
								<ThSort {table} field="country">Country</ThSort>
							</tr>
						</thead>
						<tbody>
							{#each table.rows as row}
								<tr
									class:active={table.selected.includes(row.id)}
									class="bg-white border-b hover:bg-[#F9FAFB]"
								>
									<td class="w-4 p-4">
										<input
											class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
											type="checkbox"
											checked={table.selected.includes(row.id)}
											onclick={() => table.select(row.id)}
										/>
									</td>
									<td>{row.first_name}</td>
									<td>{row.last_name}</td>
									<td>{row.city}</td>
									<td>{row.country}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</Datatable>
			</div>
			{#if showFilter}
				<div
					class="flex flex-col items-start justify-start border shadow-md rounded-md gap-3 p-4"
				>
					<Filter onSelect={handleFilterCity} title={'City'} options={cityOptions} />
					<Filter onSelect={handleFilterCountry} title={'Country'} options={countryOptions} />
				</div>
			{/if}
		</div>
	{/if}
</div>
