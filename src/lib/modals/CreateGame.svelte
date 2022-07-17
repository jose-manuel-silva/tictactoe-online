<script>
	import { closeModal } from 'svelte-modals';
	import { createGame } from '$lib/game';

	export let isOpen;

	let promise = createGame();

	function join(gameID) {
		localStorage.setItem('gameID', gameID);
		if (gameID) {
			window.location.href = `/game/${gameID}`;
		}
	}
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="contents">
			{#await promise}
				<h1>Creating Game...</h1>
			{:then data}
				<h1>Game Created!</h1>
				<h2>Game ID: {data}</h2>
				<div class="actions">
					<button class="smallbutton" on:click={() => join(data)}>Join</button>
					<button class="smallbutton" on:click={closeModal}>Cancel</button>
				</div>
			{:catch error}
				<h1>Error</h1>
				<h2>{error}</h2>
				<div class="actions">
					<button class="smallbutton" on:click={closeModal}>Cancel</button>
				</div>
			{/await}
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.contents {
		min-width: 350px;
		border-radius: 10px;
		padding: 16px;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
		background-color: var(--background-color);
		border: 3px solid black;
		text-align: center;
	}

	.actions {
		margin-top: 30px;
	}
</style>
