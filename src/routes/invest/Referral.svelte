<script lang="ts">
	let copied: boolean;

	async function copyText(text: string) {
		const clipboard = window.navigator?.clipboard;
		if (clipboard !== undefined) {
			clipboard.writeText(text);
			copied = true;
			return;
		}

		const input = document.createElement('input');
		input.value = text;
		input.style.position = 'fixed';
		input.style.right = '-9999999999999999999999999px';
		input.style.top = '-9999999999999999999999999px';
		input.style.zIndex = '9999999999999999999999999999999';
		document.body.appendChild(input);
		input.focus();
		input.select();
		document.execCommand('copy');
		input.remove();
	}

	async function copyReferralLink() {
		await copyText('referral link');
	}
</script>

<div class="w-full rounded p-6">
	<button on:click={copyReferralLink}>Copy Link</button>
</div>
