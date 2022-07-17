import supabase from '../adminsupabase';

/** @type {import('./__types/items').RequestHandler} */
export async function POST({ request }) {
	//get data from body
	let { gameID, positions, current_element } = await request.json();

	let { error } = await supabase
		.from('games')
		.update({ moves: positions, current_element: current_element == 1 ? 2 : 1 })
		.eq('id', gameID);

	if (checkForWin(positions)) {
		await supabase.from('games').update({ win: true }).eq('id', gameID);
		return {
			status: 200,
			body: {
				win: true,
				tie: false
			}
		};
	}

	if (checkForTie(positions)) {
		await supabase.from('games').update({ tie: true }).eq('id', gameID);
		return {
			status: 200,
			body: {
				win: false,
				tie: true
			}
		};
	}

	if (error) {
		return {
			status: 500,
			body: {
				error: 'Failed to update game'
			}
		};
	}

	return {
		status: 200,
		body: {
			win: false,
			tie: false
		}
	};
}

function checkForWin(positions) {
	let win = false;

	//check rows
	for (let i = 0; i < 3; i++) {
		if (positions[i][0] === positions[i][1] && positions[i][1] === positions[i][2]) {
			if (positions[i][0] !== 0) {
				win = true;
			}
		}
	}

	//check columns
	for (let i = 0; i < 3; i++) {
		if (positions[0][i] === positions[1][i] && positions[1][i] === positions[2][i]) {
			if (positions[0][i] !== 0) {
				win = true;
			}
		}
	}

	//check diagonals
	if (positions[0][0] === positions[1][1] && positions[1][1] === positions[2][2]) {
		if (positions[0][0] !== 0) {
			win = true;
		}
	}

	if (positions[0][2] === positions[1][1] && positions[1][1] === positions[2][0]) {
		if (positions[0][2] !== 0) {
			win = true;
		}
	}

	return win;
}

function checkForTie(positions) {
	let tie = true;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (positions[i][j] === 0) {
				tie = false;
			}
		}
	}

	return tie;
}
