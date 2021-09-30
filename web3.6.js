const Web3 = require('web3');
const rpcURL = "https://ropsten.infura.io/v3/fa46fd160fd847c39ce43273c683de53";
const web3 = new Web3(rpcURL);
const contractAddress = "0x9A9db21c812cB716e13bf049A3DA33DDE90e2fe2";
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ageCaller",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "age",
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
		"name": "getAge",
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
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setAge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contract = new web3.eth.Contract(contractABI, contractAddress);
const eventFunction = async () => {
    try {
        let getAllEvent = await contract.getPastEvents("AllEvents", {
            fromBlock: 0,
            toBlock: "latest"
        });
        console.log("getAllEvent :", getAllEvent);

    }catch(err) {
        console.log(err);
    }
}
eventFunction();