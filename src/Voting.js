let web3 = require('./Web3')
let abi = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "all_Votings",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "creator_addr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "target_voting",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "num_voted",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "usedMoney",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isSuccess",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "voter_num",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "comment_num",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "all_votings_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_initiator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_goalMoney",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_remainingtime",
				"type": "uint256"
			}
		],
		"name": "createFunding",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundId",
				"type": "uint256"
			}
		],
		"name": "contribute",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "createProposal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isAgree",
				"type": "bool"
			}
		],
		"name": "agreeProposal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundId",
				"type": "uint256"
			}
		],
		"name": "getMyFundings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			}
		],
		"name": "getProposal",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundId",
				"type": "uint256"
			}
		],
		"name": "getProposalsLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
let address = '0x13A194C98eEf7843a949E66b6948F2A1b3143e09'
let VotingInstance = new web3.eth.Contract(abi, address)
module.exports = VotingInstance