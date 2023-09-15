import type { Writable } from "svelte/store";
import { INVESTMENT } from "./ABIs";
import { env } from "$env/dynamic/public";
import type { Investment } from "./structure";

type ContractInterface = any;
type FeedbackStore = Writable<{ message: string; type: string }[]>

export class InvestmentContract {
    web3: any;
    connectedAddress: string;
    contract: ContractInterface;
    feedbackStore: FeedbackStore;
    constructor(web3: any, connectedAddress: string, feedbackStore: FeedbackStore) {
        this.web3 = web3;
        this.connectedAddress = connectedAddress;
        this.contract = new web3.eth.Contract(INVESTMENT, env.PUBLIC_CONTRACT_ADDRESS);
        this.feedbackStore = feedbackStore
    }

    async sendTransaction(transaction: any, txSetting: { [key: string]: any } = {}) {
        const gasPrice = await this.web3.eth.gasPrice
        txSetting = { ...txSetting, gasPrice, from: this.connectedAddress }
        try {
            const gas = await transaction.estimateGas(txSetting);
            const result = await transaction.send({ ...txSetting, gas })
            console.log(result)
        }
        catch (e: any) {
            console.error(e)
            this.feedbackStore.update(fbs => {
                return [{
                    message: e.message,
                    type: 'error'
                }, ...fbs]
            })
        }
    }

    async getPlans() {
        const result = await this.contract.methods.getPlans().call();
        return result
    }

    async getPlan(planID: number) {
        const result = await this.contract.methods.getPlan(planID).call();
        return result
    }

    async getPlansID(): Promise<number[]> {
        const result = await this.contract.methods.getPlansID().call()
        return result
    }

    async getInvestment(investmentID: number) {
        const result = await this.contract.methods.getInvestment(this.connectedAddress, investmentID).call();
        return result
    }

    async getInvestments() {
        const result = await this.contract.methods.getInvestments(this.connectedAddress).call();
        return result
    }

    async getReferralEarnings() {
        const result = await this.contract.methods.getReferralEarnings(this.connectedAddress).call();
        return result
    }
    async getInvestmentEarning(investment: Investment) {
        const result = await this.contract.methods.getInvestmentEarning(investment).call();
        return result
    }

    async getInvestmentsID() {
        const result = await this.contract.methods.getUserInvestmentsID(this.connectedAddress).call();
        return result
    }



    async invest(planID: number, amount: number, referral: string) {
        const transaction = this.contract.methods.invest(planID, referral)
        this.sendTransaction(transaction, { value: this.web3.utils.toWei(amount.toString(), 'ether') })
    }

    async withdrawReward(investmentID: number, amount: number, address: string) {
        const transaction = this.contract.methods.withdrawReward(investmentID, this.web3.utils.toWei(amount.toString(), 'ether'), address)
        this.sendTransaction(transaction)
    }

    async closeInvestment(investmentID: number) {
        const transaction = this.contract.methods.closeInvestment(investmentID)
        this.sendTransaction(transaction)
    }

}