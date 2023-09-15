export interface Investment {
    id: number;
    deposit: number;
    planID: number;
    isActive: boolean;
    withdrawnAmount: number;
    createdOn: number;
    closedOn: number;
};