import { INVESTMENT } from "./ABIs";

type ContractInterface = any;


class InvestmentContract {
    web3: any;
    connectedAddress: string;
    contract: ContractInterface;
    constructor(web3: any, connectedAddress: string) {
        this.web3 = web3;
        this.connectedAddress = connectedAddress;
        this.contract = new web3.eth.Contract(INVESTMENT, '');
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
        const result = await this.contract.methods.getInvesment(this.connectedAddress, investmentID).call();
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

    async getInvestmentsID() {
        const result = await this.contract.methods.getUserInvestmentsID(this.connectedAddress).call();
        return result
    }



    async invest(planID: number, amount: number, referral: string) {
        const transaction = this.contract.methods.invest(planID, referral)
        const gasPrice = await this.web3.eth.gasPrice
        const txSetting: { [key: string]: any } = {
            from: this.connectedAddress,
            gasPrice,
            value: this.web3.utils.toWei(amount.toString(), 'ether');
        }
        try {
            const gas = await transaction.estimateGas(txSetting);
            const result = await transaction.send({ ...txSetting, gas })
            console.log(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    async withdrawReward(investmentID: number, amount: number, address: string) {
        const transaction = this.contract.methods.withdrawReward(investmentID, this.web3.utils.toWei(amount.toString(), 'ether'), address)
        const gasPrice = await this.web3.eth.gasPrice
        const txSetting: { [key: string]: any } = {
            from: this.connectedAddress,
            gasPrice
        }

        try {
            const gas = await transaction.estimateGas(txSetting);
            const result = await transaction.send({ ...txSetting, gas })
            console.log(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    async closeInvestment(investmentID: number) {
        const transaction = this.contract.methods.closeInvestment(investmentID)
        const gasPrice = await this.web3.eth.gasPrice
        const txSetting: { [key: string]: any } = {
            from: this.connectedAddress,
            gasPrice
        }
        try {
            const gas = await transaction.estimateGas(txSetting);
            const result = await transaction.send({ ...txSetting, gas })
            console.log(result)
        }
        catch (e) {
            console.error(e)
        }
    }

}