<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let investment: {
		deposit: number;
		planID: number;
		isActive: boolean;
		withdrawnAmount: number;
		createdOn: number;
		closedOn: number;
	};

	let withdrawEarning: boolean;
	let amount: number;
	let address: string;

	const emiter = createEventDispatcher();

	function withdrawReward() {
		emiter('claim', { amount, address });
	}
</script>

<div class="w-full shadow-sm shadow-gray-950 rounded-lg text-gray-800 relative overflow-hidden">
	{#if withdrawEarning}
		<div
			class="absolute inset-0 bg-gray-950 bg-opacity-90 backdrop-blur-sm flex justify-center align-middle place-items-center p-4 text-sm"
			on:click|self={() => {
				withdrawEarning = false;
			}}
			on:keydown
		>
			<div class="max-w-[200px] w-full flex flex-col gap-2">
				<label class="flex flex-col text-gray-50">
					amount
					<div class="w-full flex relative bg-gray-200">
						<input
							type="text"
							inputmode="decimal"
							bind:value={amount}
							class="text-gray-950 p-1 rounded-l bg-none border-none outline-none"
						/>
						<button class="p-2 bg-gray-950 rounded-r">max</button>
					</div>
				</label>
				<label class="flex flex-col text-gray-50">
					address
					<input type="text" bind:value={address} class="p-1 rounded text-gray-950 bg-gray-200" />
				</label>
				<button class="p-2 bg-green-400 rounded" on:click={withdrawReward}>withdraw</button>
			</div>
		</div>
	{/if}

	<div class="flex flex-col gap-1 p-2">
		<div class="flex justify-between">
			Investment: <p class="text-gray-700 font-medium">{investment.deposit} ETH</p>
		</div>
		<div class="flex justify-between">
			Is Active: <p class="text-gray-700 font-medium">{investment.isActive} ETH</p>
		</div>
		<div class="flex justify-between">
			Plan Detail: <p class="text-gray-700 font-medium">{investment.deposit} ETH</p>
		</div>
		<div class="flex justify-between">
			Created On: <p class="text-gray-700 font-medium">
				{new Date(investment.createdOn).toLocaleDateString()}
			</p>
		</div>
	</div>

	<div class="p-2">
		{#if investment.isActive}
			<div class="flex gap-2">
				<button
					class="p-1 w-full bg-green-300 rounded text-gray-950"
					on:click={() => {
						if (withdrawEarning) {
							withdrawEarning = false;
							return;
						}
						withdrawEarning = true;
					}}>withdraw earning</button
				>
				<button class="p-1 w-full bg-red-300 rounded text-gray-950" on:click={() => emiter('close')}
					>end investment</button
				>
			</div>
		{:else}
			<button
				class="p-1 w-full bg-green-300 rounded text-gray-950"
				on:click={() => emiter('reinvest')}>reinvest</button
			>
		{/if}
	</div>
</div>
