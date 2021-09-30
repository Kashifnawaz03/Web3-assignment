var Tx = require('ethereumjs-tx')//.Transaction;
var Web3 = require("web3");

const rpcURL = "https://ropsten.infura.io/v3/fa46fd160fd847c39ce43273c683de53";
const web3 = new Web3(rpcURL);
const account = "0x579a84923cB461E5a130B1Bfd28480834781C470";
const privatekey = "d225ffdc07585f0bb743eb515c478869d34a1be7756be415ccec224a13af7352";
const privatekeyBuffer = Buffer.from(privatekey, "hex");
const contractAddress = "0xfE61712A1228635E0d7Dab04934585d0A66Bdf25";
const contractABI = [
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

const callingFunction = async () => {
    try {
        const TxCount = await web3.eth.getTransactionCount(account);
        txObject = {
            nonce: web3.utils.toHex(TxCount),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gWei')),
            gasLimit: web3.utils.toHex(2000000),
            data: contract.methods.setAge(42).encodeABI(),
            to: contractAddress
        }
        const tx = new Tx.Transaction(txObject, { 'chain':'ropsten' });
        tx.sign(privatekeyBuffer);
        const TXSERIALIZE = tx.serialize();
        const raw = '0x' + TXSERIALIZE.toString('hex');

        const response = await web3.eth.sendSignedTransaction(raw);
        console.log(response);

    } catch(err) {
        console.log(err);
    }
}
callingFunction();