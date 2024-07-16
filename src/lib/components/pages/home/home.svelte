<script lang="ts" `>
	import {
		TableHandler,
		Datatable,
		ThSort,
		Th,
		Search,
		RowsPerPage,
		RowCount,
		Pagination
	} from '@vincjo/datatables';
	import { Filter, SkeletonTable } from '$lib/components/common';
	import { dataStore, fetchData, type FetchUserVaribles } from '$lib/store/fetchUserData';
	import { onMount } from 'svelte';
	import type { listItem, info, apiRes } from '$lib/components/pages/home/types';

	let info: info;
	let list: listItem[] = [];
	let table = new TableHandler<listItem>();
	let variables: FetchUserVaribles = {
		page: 1,
		limit: 100,
		seed: ''
	};

	onMount(() => {
		fetchData(variables);
		const unsubscribe = dataStore.subscribe((value: apiRes | null) => {
			if (!value?.results.length) return; //early return if gut null on list

			const formattedList: listItem[] = value.results.map((item) => ({
				id: window.crypto.randomUUID(),
				first_name: item.name.first,
				last_name: item.name.last,
				city: item.location.city,
				country: item.location.country
			}));

			list = formattedList;

			table = new TableHandler<listItem>(list, { rowsPerPage: 10, selectBy: 'id' });
		});

		return () => {
			unsubscribe();
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
	{#if list.length}
		<div class="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 border">
			<Datatable {table}>
				{#snippet header()}
					<div class="flex w-full justify-between items-center">
						<div class="px-4">
							<p class="text-lg font-semibold">User</p>
						</div>
						<div class="flex items-center justify-end gap-2 px-4">
							<Search {table} />
							<Filter />
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
	{:else}
		<SkeletonTable />
	{/if}
</div>
