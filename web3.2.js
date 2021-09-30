const Web3 = require("Web3");
const rpcURL = "https://ropsten.infura.io/v3/fa46fd160fd847c39ce43273c683de53";

const ABI = [
	{
		"inputs": [],
		"name": "retrieve",
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
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const web3 = new Web3(rpcURL);
const contractAddress = "0xdcc98e910B692722C0e389b900624830989A1d2B";
const getData = async () => {
    try {
        const contract = await new web3.eth.Contract(ABI, contractAddress);
        const totalsupply = await contract.methods.retrieve().call();
        console.log(totalsupply);

    }catch(err) {

    }
}
getData();

/*const contractAddress = "0xdcc98e910B692722C0e389b900624830989A1d2B";
const contract = new web3.eth.Contract(ABI,contractAddress);
contract.methods.retrieve().call((err,result)=>{
    if(!err){
        console.log("Result from contract", result);
    }
})*/