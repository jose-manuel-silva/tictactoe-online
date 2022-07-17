<script>
	//if 1, then cross, if 2, then circle, if 0, then empty
	export let element;
	export let this_player;

	let hover = false;
</script>

<div class="square">
	{#if element === 1}
		<div class="cross" />
	{:else if element === 2}
		<div class="circle" />
	{:else}
		<div
			class="empty"
			on:click
			on:mouseenter={() => (hover = true)}
			on:mouseleave={() => (hover = false)}
		>
			<div class={hover ? (this_player == 1 ? 'cross emptyhover' : 'circle emptyhover') : ''} />
		</div>
	{/if}
</div>

<style>
	.square {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100px;
		height: 100px;
	}

	.empty {
		width: 50px;
		height: 50px;
		cursor: pointer;
	}

	.emptyhover {
		opacity: 0.2;
	}
</style>
