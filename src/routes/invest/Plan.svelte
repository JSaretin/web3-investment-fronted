<script lang="ts">
	import { web3 } from 'svelte-web3';
	import { createEventDispatcher } from 'svelte';

	export let plan: {
		percent: number;
		minDeposit: number;
		id: number;
	};
	export let expand: boolean;

	const emiter = createEventDispatcher();
	let investment: number;
</script>

<div class="w-full shadow-sm shadow-gray-950 rounded-md overflow-hidden">
	<button class="w-full p-2 flex flex-col gap-2" on:click={() => emiter('select')}>
		<div class="font-bold w-full flex justify-between place-items-center align-middle">
			<h3 class="">Plan</h3>
			#{plan.id}
		</div>
		<div class="flex w-full justify-between">
			<p>yearly ROI:</p>
			<p>{plan.percent}%</p>
		</div>
		<div class="flex w-full justify-between">
			<p>hourly ROI:</p>
			<p>{(plan.percent / 365 / 24).toFixed(5)}%</p>
		</div>
		<div class="flex w-full justify-between">
			<p>min deposit:</p>
			<p>{$web3.utils.fromWei(plan.minDeposit, 'ether')} ETH</p>
		</div>
	</button>

	{#if expand}
		<div class="pb-2 px-2 w-full flex flex-col gap-2">
			<label class="flex flex-col gap-2">
				amount
				<input
					type="text"
					inputmode="decimal"
					class="{'p-2 rounded bg-gray-300 text-gray-950 outline-2 border-none ' +
						(!investment || investment <= 0 ? 'outline-pink-400' : 'outline-green-400')}}"
					bind:value={investment}
				/>
			</label>
			<button
				disabled={!investment || investment <= 0}
				class="py-1 px-6 bg-inherit hover:bg-gray-950 text-gray-950 font-bold border border-gray-950 hover:text-gray-50 rounded disabled:cursor-not-allowed"
				on:click={() => {
					if (!Boolean(investment)) return;
					emiter('invest', investment);
				}}>invest</button
			>
		</div>
	{/if}
</div>
