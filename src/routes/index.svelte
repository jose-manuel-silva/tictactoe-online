<script>
	import { openModal } from 'svelte-modals';
	import JoinGame from '$lib/modals/JoinGame.svelte';
	import CreateGame from '$lib/modals/CreateGame.svelte';

	function joinGameModal() {
		openModal(JoinGame);
	}

	function createGameModal() {
		openModal(CreateGame);
	}
</script>

<div class="main">
	<div class="buttons">
		<button class="bigbutton" on:click={() => createGameModal()}>Create Game</button>
		<button class="bigbutton" on:click={() => joinGameModal()}>Join Game</button>
	</div>
</div>

<style>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.buttons {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
	}
</style>
