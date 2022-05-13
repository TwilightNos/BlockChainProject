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
<<<<<<< HEAD
=======
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
				"name": "_target_ticket",
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
		"name": "MyVotings",
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
>>>>>>> 0c0eb1ee53a41a37f919412ccdf017cddc6f58d6
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
<<<<<<< HEAD
let address = '0x0e0E8f6B357120432F104Db2dDA9218316b90337'
=======
let address = '0xC5bDd8d99f9c9c540FB96Ac0c20f53E8D7af6605'
>>>>>>> 0c0eb1ee53a41a37f919412ccdf017cddc6f58d6
let VotingInstance = new web3.eth.Contract(abi, address)
module.exports = VotingInstance