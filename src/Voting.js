let web3 = require('./Web3')
let address = '0x69A9b8d666F1B4623BE1781Ff368A77FE5F4119b'
let abi =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_votingId",
				"type": "uint256"
			}
		],
		"name": "MyCreatedVotings",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_votingId",
				"type": "uint256"
			}
		],
		"name": "MyVotings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_votingId",
				"type": "uint256"
			}
		],
		"name": "Vote_sender",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
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
				"name": "_target_tickets",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_remainingtime",
				"type": "uint256"
			}
		],
		"name": "Voting_constructor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
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
				"name": "endtime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isComplete",
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
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "all_votings_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let VotingInstance = new web3.eth.Contract(abi, address)
module.exports = VotingInstance