let web3 = require('../utils/InitWeb3')
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
		"name": "all_votings_num",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "initiator",
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
				"name": "_creator_addr",
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
				"name": "_target_voting",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endtime",
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
		"name": "Vote_sender",
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
				"name": "_votingId",
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
		"name": "Announcement_Creator",
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
				"name": "_votingId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_announcementId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isAgree",
				"type": "bool"
			}
		],
		"name": "confirmAnnouncement",
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
				"name": "_votingId",
				"type": "uint256"
			}
		],
		"name": "getTickets",
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
				"name": "_votingId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_announcementId",
				"type": "uint256"
			}
		],
		"name": "receiveAnnouncement",
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
				"name": "_votingId",
				"type": "uint256"
			}
		],
		"name": "num_of_Announcements",
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
let address = '0x34C43CB90Dd3d408C5AE4524702b3a317afeDe13'
let FundingInstance = new web3.eth.Contract(abi, address)
module.exports = FundingInstance