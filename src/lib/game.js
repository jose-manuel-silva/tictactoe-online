import supabase from './supabase';

async function doesGameExist(gameId) {
	const { data, error } = await supabase.from('games').select('id').eq('id', gameId);

	if (error) {
		return false;
	}
	return data.length > 0;
}

async function createGame() {
	let url = '/api/creategame';

	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (res.ok) {
		const json = await res.json();
		return json.id;
	}

	throw new Error(`Failed to create game: ${res.status}`);
}

async function getGameInfo(gameID) {
	const { data, error } = await supabase.from('games').select('*').eq('id', gameID);

	if (error) {
		return false;
	}

	return data[0];
}

async function updateGame(gameID, positions, current_element) {
	let url = '/api/updategame';

	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			gameID,
			positions,
			current_element
		})
	});

	if (res.ok) {
		const json = await res.json();
		return json;
	}

	throw new Error(`Failed to update game: ${res.status}`);
}

export { doesGameExist, createGame, getGameInfo, updateGame };
