<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Plan } from './structure';
	import type { InvestmentContract } from './lib';
	import { getContext } from 'svelte';
	import { web3 } from 'svelte-web3';

	const contractInstance: Writable<InvestmentContract> = getContext('contractInstance');

	export let plans: Plan[];

	let selectedPlan: number = plans.length > 0 ? 1 : 0;
	let investment: number = plans.filter((p) => p.id == selectedPlan)[0]?.minDeposit || 0;
	let reward: number = 0;
	let duration: string;

	async function calculateReward() {
		const now = new Date();
		const future = new Date(duration);
		const diff = future.getTime() - now.getTime();
		if (diff <= 0) return;

		reward = Number(
			$web3.utils.fromWei(
				await $contractInstance.calculateReward(
					investment,
					plans.filter((p) => p.id == selectedPlan)[0]?.percent,
					diff
				),
				'ether'
			)
		);
	}
</script>

<div class="flex flex-col max-w-sm gap-2 w-full rounded-lg p-6 shadow-sm shadow-gray-950">
	<p>
		Invest <b>{investment} ETH</b> and get <b>{investment + reward}</b> after {reward} days
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
	<label class="flex flex-col">
		Days
		<input type="datetime" class="bg-gray-200 p-1 rounded" bind:value={duration} />
	</label>
	<label class="flex flex-col">
		Select Plan
		<select class="p-2 rounded-md" bind:value={selectedPlan} on:change={calculateReward}>
			{#each plans as plan (plan.id)}
				<option value={plan.id}>Plan #{plan.id}</option>
			{/each}
		</select>
	</label>
</div>
