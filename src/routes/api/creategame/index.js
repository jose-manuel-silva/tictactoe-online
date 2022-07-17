import supabase from '../adminsupabase';

/** @type {import('./__types/items').RequestHandler} */
export async function POST() {
	let id = await createGame();

	if (id === false) {
		return {
			status: 500,
			body: {
				error: 'Failed to create game'
			}
		};
	}

	return {
		status: 200,
		body: {
			id
		}
	};
}

async function createGame() {
	let emptyGame = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];

	const { data, error } = await supabase.from('games').insert([{ moves: emptyGame }]);

	if (error) {
		console.log(error);
		return false;
	}

	return data[0].id;
}
