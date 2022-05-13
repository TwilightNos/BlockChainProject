let web3 = require('./Web3')
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
				"name": "_goalMoney",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endtime",
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
				"name": "confirmed_ticket",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endtime",
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
let address = '0x0e0E8f6B357120432F104Db2dDA9218316b90337'
let VotingInstance = new web3.eth.Contract(abi, address)
module.exports = VotingInstance