<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let plan: {
		percent: number;
		minDeposit: number;
	};
	export let id: number;
	export let expand: boolean;

	const emiter = createEventDispatcher();
	let investment: number;
</script>

<div class="w-full shadow-sm shadow-gray-950 rounded-md overflow-hidden">
	<button class="w-full p-2 flex flex-col gap-2" on:click={() => emiter('select')}>
		<div class="font-bold w-full flex justify-between place-items-center align-middle">
			<h3 class="">Plan</h3>
			#{id + 1}
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
			<p>{plan.minDeposit}</p>
		</div>
	</button>

	{#if expand}
		<div class="pb-2 px-2 w-full flex flex-col gap-2">
			<label class="flex flex-col gap-2">
				amount
				<input
					type="text"
					inputmode="decimal"
					class="p-2 rounded bg-gray-300 text-gray-950"
					bind:value={investment}
				/>
			</label>
			<button
				class="py-1 px-6 bg-inherit hover:bg-gray-950 text-gray-950 font-bold border border-gray-950 hover:text-gray-50 rounded"
				on:click={() => {
					if (!Boolean(investment)) return;
					emiter('invest', investment);
				}}>invest</button
			>
		</div>
	{/if}
</div>
