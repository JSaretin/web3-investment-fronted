<script lang="ts">
	import Investment from './Investment.svelte';
	import Plan from './Plan.svelte';

	const plans = [
		{
			percent: 20,
			minDeposit: 1
		},
		{
			percent: 15,
			minDeposit: 0.5
		},
		{
			percent: 10,
			minDeposit: 0.1
		}
	];

	const investments = [
		{
			deposit: 1,
			planID: 1,
			isActive: true,
			withdrawnAmount: 0,
			createdOn: new Date().getTime() - 1000 * 60 * 60,
			closedOn: 0
		},
		{
			deposit: 0.6,
			planID: 2,
			isActive: false,
			withdrawnAmount: 0,
			createdOn: new Date().getTime() - 1000 * 60 * 60,
			closedOn: 0
		},
		{
			deposit: 3,
			planID: 2,
			isActive: true,
			withdrawnAmount: 0,
			createdOn: new Date().getTime() - 1000 * 60 * 60,
			closedOn: 0
		}
	];

	let expand: number | undefined;

	async function invest(amount: number) {}

	async function withdrawReward(e: { detail: { amount: number; address: string } }) {
		const { amount, address } = e.detail;
	}

	async function closeInvestment(investmentID: number) {}
</script>

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
	<div class="flex gap-4">
		<div class="max-w-sm w-full">
			<h2 class="text-lg text-center p-4 text-gray-950 font-semibold">Availible Plans</h2>
			<div class="w-full p-4 rounded-lg shadow-sm shadow-black flex flex-col gap-2">
				{#each plans as plan, index}
					<Plan
						{plan}
						id={index}
						expand={index === expand}
						on:select={() => {
							if (index === expand) {
								expand = undefined;
								return;
							}
							expand = index;
						}}
						on:invest={async (e) => {
							await invest(e.detail);
						}}
					/>
				{/each}
			</div>
		</div>
		<div class="flex-1 w-full">
			<h2 class="text-lg text-center p-4 text-gray-950 font-semibold">Investments</h2>
			<div class="w-full p-4 rounded-lg shadow-sm shadow-black flex flex-col gap-2">
				{#each investments as investment, index}
					<Investment
						{investment}
						on:claim={withdrawReward}
						on:close={async () => {
							await closeInvestment(index + 1);
						}}
						on:reinvest={async () => {
							await invest(investment.deposit);
						}}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>
