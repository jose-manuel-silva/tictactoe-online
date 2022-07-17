<script>
	import { page } from '$app/stores';
	import GameTable from '$lib/GameTable.svelte';
	import supabase from '$lib/supabase';
	import { doesGameExist, getGameInfo } from '$lib/game';
	import { onMount } from 'svelte';

	let gameID = $page.params.slug;

	let this_player = 1;
	let current_player_playing = 1;
	let win = false;
	let tie = false;

	onMount(async () => {
		this_player = localStorage.getItem('gameID') === gameID ? 1 : 2;
		let gameInfo = await getGameInfo(gameID);

		console.log('player', this_player);
		current_player_playing = gameInfo.current_element;
		console.log('current_player_playing', current_player_playing);
		positions = gameInfo.moves;
		win = gameInfo.win;
		tie = gameInfo.tie;
	});

	//let doesGameExistPromise = doesGameExist(gameID);

	supabase
		.from('games:id=eq.' + gameID)
		.on('*', (payload) => {
			handleUpdate(payload);
		})
		.subscribe();

	function handleUpdate(update) {
		positions = update.new.moves;
		current_player_playing = update.new.current_element;
		win = update.new.win;
		tie = update.new.tie;
		positions = positions;
	}

	let positions = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];
</script>

<!-- {$page.params.slug} -->

<GameTable {tie} {win} {gameID} {this_player} {positions} {current_player_playing} />
