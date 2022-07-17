<script>
	import GameSquare from './GameSquare.svelte';
	import { updateGame } from '$lib/game';
	export let positions;
	export let gameID;
	export let current_player_playing;
	export let this_player;

	export let tie = false;
	export let win = false;

	function click(coordinates) {
		if (this_player !== current_player_playing) {
			return;
		}

		positions[coordinates[0]][coordinates[1]] = this_player;
		positions = positions;

		updateGame(gameID, positions, current_player_playing);
	}

	function getElement(coordinates) {
		console.log(coordinates, positions[coordinates[0]][coordinates[1]]);
		return positions[coordinates[0]][coordinates[1]];
	}
</script>

<div class="text">
	<h1>TicTacToe #{gameID}</h1>
	{#if !tie && !win}
		{#if this_player === current_player_playing}
			<p>Your turn</p>
		{:else}
			<p>Waiting for opponent</p>
		{/if}
	{/if}

	{#if tie}
		<h2 class="tie">Tie</h2>
	{/if}

	{#if win}
		<h2 class="win">
			{current_player_playing != this_player ? 'You won!' : 'You opponent won!'}
		</h2>
	{/if}
</div>

<div class="gametable {win || tie ? 'noclick' : ''}">
	<div class="firstrow">
		<GameSquare {this_player} element={positions[0][0]} on:click={() => click([0, 0])} />
		<GameSquare {this_player} element={positions[0][1]} on:click={() => click([0, 1])} />
		<GameSquare {this_player} element={positions[0][2]} on:click={() => click([0, 2])} />
	</div>
	<div class="secondrow">
		<GameSquare {this_player} element={positions[1][0]} on:click={() => click([1, 0])} />
		<GameSquare {this_player} element={positions[1][1]} on:click={() => click([1, 1])} />
		<GameSquare {this_player} element={positions[1][2]} on:click={() => click([1, 2])} />
	</div>
	<div class="thirdrow">
		<GameSquare {this_player} element={positions[2][0]} on:click={() => click([2, 0])} />
		<GameSquare {this_player} element={positions[2][1]} on:click={() => click([2, 1])} />
		<GameSquare {this_player} element={positions[2][2]} on:click={() => click([2, 2])} />
	</div>
</div>

{#if tie || win}
	<div class="home">
		<a class="bigbutton" href="/">Go Home</a>
	</div>
{/if}

<style>
	.home {
		margin-top: 150px;
		text-align: center;
	}
	.text {
		text-align: center;
	}
	.noclick {
		pointer-events: none;
	}
	.gametable {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.firstrow,
	.secondrow,
	.thirdrow {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: auto;
	}

	/* add border beetwen rows */
	.firstrow,
	.secondrow,
	.thirdrow:not(:last-child) {
		border-bottom: 2px solid #000;
	}

	/* add border beetwen columns */
	.firstrow > :global(.square):not(:last-child),
	.secondrow > :global(.square):not(:last-child),
	.thirdrow > :global(.square):not(:last-child) {
		border-right: 2px solid #000;
	}
</style>
