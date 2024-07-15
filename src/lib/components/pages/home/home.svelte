<script>
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
	import data from '../../../../utils/dummy.json';
	import { Filter } from '$lib/components/common';

	const table = new TableHandler(data, { rowsPerPage: 10, selectBy: 'id' });
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
						<ThSort {table} field="email">Email</ThSort>
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
							<td>{row.email}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</Datatable>
	</div>
</div>
