export interface Investment {
    id: number;
    deposit: number;
    planID: number;
    isActive: boolean;
    withdrawnAmount: number;
    createdOn: number;
    closedOn: number;
    earnings: number;
};


export interface Plan {
    percent: number;
    minDeposit: number;
    id: number;
}