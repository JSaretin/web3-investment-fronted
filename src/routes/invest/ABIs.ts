export const INVESTMENT = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "investor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "investmentID",
                "type": "uint256"
            }
        ],
        "name": "CloseInvestment",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "referral",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "RewardReferral",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "investor",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "WithdrawReward",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "planID",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            }
        ],
        "name": "calculateReward",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "planID",
                "type": "uint256"
            }
        ],
        "name": "getPlan",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "percent",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minDeposit",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Plan.AvailiblePlan",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "getPlans",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "percent",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minDeposit",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Plan.AvailiblePlan[]",
                "name": "plans",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "getPlansID",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "referral",
                "type": "address"
            }
        ],
        "name": "rewardReferral",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive",
        "payable": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "investor",
                "type": "address"
            }
        ],
        "name": "getUserInvestmentsID",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "investor",
                "type": "address"
            }
        ],
        "name": "getInvestments",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "planID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deposit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "createdOn",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "closedOn",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "withdrawnAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Investment.UserInvestment[]",
                "name": "userInvestments",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "investor",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "investmentID",
                "type": "uint256"
            }
        ],
        "name": "getInvestment",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "planID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deposit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "createdOn",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "closedOn",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "withdrawnAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Investment.UserInvestment",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "planID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deposit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "createdOn",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "closedOn",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "withdrawnAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Investment.UserInvestment",
                "name": "investment",
                "type": "tuple"
            }
        ],
        "name": "getInvestmentEarning",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "planID",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "referral",
                "type": "address"
            }
        ],
        "name": "invest",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "investmentID",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "withdrawReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "investmentID",
                "type": "uint256"
            }
        ],
        "name": "closeInvestment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]