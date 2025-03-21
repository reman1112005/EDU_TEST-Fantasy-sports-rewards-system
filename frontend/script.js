const contractAddress = 0x4DbD75DC8366875ca6eeA22E8cD88E9F613cB9E3; // Replace with deployed contract address
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardIssued",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "getRewardBalance",
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
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "issueReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "projectDescription",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "projectTitle",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "rewards",
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
];

let web3;
let contract;

// Initialize Web3
async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Connected to contract!");
    } else {
        alert("Please install MetaMask!");
    }
}

// Issue reward
async function issueReward() {
    const accounts = await web3.eth.getAccounts();
    const playerAddress = document.getElementById("playerAddress").value;
    const amount = document.getElementById("rewardAmount").value;

    if (!playerAddress || !amount) {
        alert("Please enter player address and reward amount!");
        return;
    }

    try {
        await contract.methods.issueReward(playerAddress, amount).send({ from: accounts[0] });
        alert(`Issued ${amount} tokens to ${playerAddress}`);
    } catch (error) {
        console.error(error);
        alert("Transaction failed!");
    }
}

// Get reward balance
async function getBalance() {
    const playerAddress = document.getElementById("queryAddress").value;
    if (!playerAddress) {
        alert("Enter a player address!");
        return;
    }

    try {
        const balance = await contract.methods.getRewardBalance(playerAddress).call();
        document.getElementById("balanceResult").innerText = `Balance: ${balance} Tokens`;
    } catch (error) {
        console.error(error);
        alert("Failed to fetch balance!");
    }
}

window.onload = init;
