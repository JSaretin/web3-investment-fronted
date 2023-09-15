<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import Investment from './Investment.svelte';
	import Plan from './Plan.svelte';
	import Referral from './Referral.svelte';
	import { web3, selectedAccount, chainId, makeEvmStores, defaultEvmStores } from 'svelte-web3';
	import { InvestmentContract } from './lib';
	import { page } from '$app/stores';
	import { onMount, setContext } from 'svelte';

	interface Plan {
		percent: number;
		minDeposit: number;
		id: number;
	}

	interface Investment {
		id: number;
		deposit: number;
		planID: number;
		isActive: boolean;
		withdrawnAmount: number;
		createdOn: number;
		closedOn: number;
		earned: number;
	}

	let plans: Plan[] = [];

	let investments: Investment[] = [];

	let expand: number | undefined;
	const contractInstance: Writable<InvestmentContract> = writable();
	setContext('contractInstance', contractInstance)

	$: connected = $selectedAccount !== undefined && $chainId !== undefined;

	let initialized: boolean;

	$: if (connected && !initialized) {
		initialized = true;
		init();
	}

	let referralAddress: string;

	onMount(async () => {
		defaultEvmStores.setProvider();
		const savedRef = localStorage.getItem('ref');
		if (savedRef) {
			referralAddress = savedRef;
			return;
		}
		const ref = $page.url.searchParams.get('ref');
		if (!ref || $web3.utils.isAddress(ref)) {
			// referralAddress = '0x' + Array(40).join('0');
			referralAddress = '0xf94b2b3f57d9ef5071d7bc0d2401bfc8f70505c5';
			return;
		}
		localStorage.setItem('ref', ref);
		referralAddress = ref;
	});

	async function updatePlans() {
		const plansID: number[] = await $contractInstance.getPlansID();
		plans = await Promise.all(
			plansID.map(async (planID) => {
				const plan: Omit<Plan, 'id'> = await $contractInstance.getPlan(planID);
				return { ...plan, id: planID };
			})
		);
	}

	async function updateInvestments() {
		const investmentsID = await $contractInstance.getInvestmentsID();
		investments = (
			await Promise.all(
				investmentsID.map(async (investmentID: number) => {
					const investment: Omit<Investment, 'id'> = await $contractInstance.getInvestment(
						investmentID
					);
					return {
						...investment,
						id: investmentID
						// earned: await $contractInstance.getInvestmentEarning(investmentID)
					};
				})
			)
		).reverse();
	}

	async function init() {
		$contractInstance = new InvestmentContract($web3, $selectedAccount as string, feedbacks);

		await updatePlans();
		await updateInvestments();
	}

	async function invest(amount: number, planID: number) {
		await $contractInstance.invest(planID, amount, referralAddress);
		await updateInvestments();
	}

	async function withdrawReward(data: { amount: number; address: string; investmentID: number }) {
		await $contractInstance.withdrawReward(
			data.investmentID,
			$web3.utils.toWei(data.amount.toString(), 'ether'),
			data.address
		);
	}

	async function closeInvestment(investmentID: number) {
		await $contractInstance.closeInvestment(investmentID);
	}

	const feedbacks: Writable<{ message: string; type: string }[]> = writable([
		// { message: 'this is a test of the error feture', type: 'error' },
		// {
		// 	message:
		// 		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum perferendis fugit ad. Repellendus sapiente iure neque atque minima! Non asperiores voluptate doloremque, ut voluptatem dolores facere deserunt saepe blanditiis omnis!',
		// 	type: 'error'
		// }
	]);
</script>

{#if $feedbacks.length > 0}
	<div class="fixed p-4 max-w-sm top-0 right-0 w-full flex flex-col gap-2">
		{#each $feedbacks as feedback, index}
			<button
				class="button-2 bg-red-400 font-mono rounded-md text-center p-4 text-sm"
				on:click={() => {
					feedbacks.update((fbs) => {
						return fbs.filter((f, i) => (i != index ? f : undefined));
					});
				}}>{feedback.message}</button
			>
		{/each}
	</div>
{/if}

<div class="max-w-4xl w-full mx-auto p-6 rounded-md h-screen flex flex-col gap-4">
	<div class="flex gap-4">
		<div
			class="max-w-sm gap-2 font-sans w-1/3 flex-col rounded-lg p-4 flex justify-center align-middle place-items-center bg-gray-50 shadow-sm shadow-gray-950"
		>
			<p>Balance</p>
			<h2 class="font-medium">2.43443 ETH</h2>
		</div>
		<div
			class="max-w-sm gap-2 font-sans w-1/3 flex-col rounded-lg p-4 flex justify-center align-middle place-items-center bg-gray-50 shadow-sm shadow-gray-950"
		>
			<p>Investment Return</p>
			<h2 class="font-medium">2.43443 ETH</h2>
		</div>
		<div
			class="max-w-sm gap-2 font-sans w-1/3 flex-col rounded-lg p-4 flex justify-center align-middle place-items-center bg-gray-50 shadow-sm shadow-gray-950"
		>
			<p>Referral Reward</p>
			<h2 class="font-medium">0.000244 ETH</h2>
		</div>
	</div>
	<div class="flex gap-4 flex-col md:flex-row">
		<div class="max-w-sm w-full">
			<h2 class="text-lg text-center p-4 text-gray-950 font-semibold">Availible Plans</h2>
			<div class="w-full p-4 rounded-lg shadow-sm shadow-black flex flex-col gap-2">
				{#each plans as plan (plan.id)}
					<Plan
						{plan}
						expand={plan.id === expand}
						on:select={() => {
							if (plan.id === expand) {
								expand = undefined;
								return;
							}
							expand = plan.id;
						}}
						on:invest={async (e) => {
							await invest(e.detail, plan.id);
						}}
					/>
				{/each}
			</div>
		</div>
		<div class="flex-1 w-full">
			<h2 class="text-lg text-center p-4 text-gray-950 font-semibold">Investments</h2>
			<div class="w-full p-4 rounded-lg shadow-sm shadow-black flex flex-col gap-2">
				{#each investments as investment (investment.id)}
					<Investment
						{investment}
						on:claim={async (e) => {
							e.detail.investmentID = investment.id;
							await withdrawReward(e.detail);
						}}
						on:close={async () => {
							await closeInvestment(investment.id);
						}}
						on:reinvest={async () => {
							await invest($web3.utils.fromWei(investment.deposit, 'ether'), investment.planID);
						}}
					/>
				{/each}
			</div>
		</div>
	</div>

	<Referral />
</div>
