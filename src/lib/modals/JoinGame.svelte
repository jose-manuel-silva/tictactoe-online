<script>
	import { closeModal } from 'svelte-modals';

	export let isOpen;
	let gameID = '';

	function join() {
		if (gameID) {
			window.location.href = `/game/${gameID}`;
		}
	}
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="contents">
			<h1>Join Game by ID</h1>
			<input type="text" bind:value={gameID} />
			<div class="actions">
				<button class="smallbutton" on:click={join}>Join</button>
				<button class="smallbutton" on:click={closeModal}>Cancel</button>
			</div>
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
		min-width: 240px;
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
