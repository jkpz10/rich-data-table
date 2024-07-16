// src/stores.js
import type { FetchUserVaribles } from '$lib/store/fetchUserData/types';
import { writable } from 'svelte/store';

export const dataStore = writable(null);

export async function fetchData({ page, limit, seed }: FetchUserVaribles) {
	const response = await fetch(
		`https://randomuser.me/api/?page=${page}&results=${limit}&seed=${seed}&inc=id,name,location`
	);
	const data = await response.json();
	dataStore.set(data);
}
