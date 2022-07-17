<script>
	import '../app.css';
	import { Modals, closeModal } from 'svelte-modals';
	import Loader from '$lib/Loader.svelte';
</script>

<Modals>
	<div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>

<slot />

<style>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
