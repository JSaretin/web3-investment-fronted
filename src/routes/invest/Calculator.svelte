<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Plan } from './structure';
	import type { InvestmentContract } from './lib';
	import { getContext } from 'svelte';
	import { web3 } from 'svelte-web3';

	const contractInstance: Writable<InvestmentContract> = getContext('contractInstance');

	export let plans: Plan[];

	let selectedPlan: number;
	let investment: number;
	let reward: string = '0.0';
	let duration: string;

	let loaded: boolean;

	$: if (!loaded && !$contractInstance != undefined) {
		loaded = true;
		selectedPlan = plans.length > 0 ? plans[0].id : 0;
		investment = plans.filter((p) => p.id == selectedPlan)[0]?.minDeposit || 0;
	}

	async function calculateReward() {
		if (!investment || investment <= 0) return;
		if (!duration) return;

		const now = new Date();
		const future = new Date(duration);
		const diff = parseInt(((future.getTime() - now.getTime()) / 1000).toString());
		if (diff <= 0) return;
		const planPercent = plans.filter((p) => p.id == selectedPlan)[0]?.percent | 0;

		const result = await $contractInstance.calculateReward(investment, planPercent, diff);
		reward = Number($web3.utils.fromWei(result, 'ether')).toFixed(5);
	}
</script>

<div class="flex flex-col max-w-sm gap-2 w-full rounded-lg p-6 shadow-sm shadow-gray-950">
	<p>
		Invest <b>{investment} ETH</b> and get <b>{reward}</b> after {reward} days
	</p>
	<label class="flex flex-col">
		Investment
		<input
			type="text"
			class="bg-gray-200 p-1 rounded"
			inputmode="decimal"
			bind:value={investment}
			on:input={calculateReward}
		/>
	</label>
	<label class="flex flex-col" on:input={calculateReward}>
		Days
		<input type="date" bind:value={duration} />
	</label>
	<label class="flex flex-col">
		Select Plan
		<select class="p-2 rounded-md" bind:value={selectedPlan} on:change={calculateReward}>
			{#each plans as plan (plan.id)}
				<option value={plan.id} selected={selectedPlan == plan.id}>Plan #{plan.id}</option>
			{/each}
		</select>
	</label>
</div>
