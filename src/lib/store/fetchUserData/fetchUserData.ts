// src/stores.js
import type { FetchUserVaribles } from '$lib/store/fetchUserData/types';
import { writable } from 'svelte/store';

export const dataStore = writable(null);
export const loadingStore = writable(false);
export const errorStore = writable(null);

export async function fetchData({ page, limit, seed }: FetchUserVaribles) {
	loadingStore.set(true);
	errorStore.set(null);

	try {
		const response = await fetch(
			`https://randomuser.me/api/?page=${page}&results=${limit}&seed=${seed}&inc=id,name,location`
		);

		if (!response.ok) {
			throw new Error('Failed to fetch data, Please reload the page');
		}

		const data = await response.json();
		dataStore.set(data);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		errorStore.set(error.message);
	} finally {
		loadingStore.set(false);
	}
}
