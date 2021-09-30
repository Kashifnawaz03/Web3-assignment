var Tx = require("ethereumjs-tx");
var Web3 = require("web3");

const rpcURL = "https://ropsten.infura.io/v3/fa46fd160fd847c39ce43273c683de53";
const web3 = new Web3(rpcURL);
const account = "0x579a84923cB461E5a130B1Bfd28480834781C470";
const privatekey = "d225ffdc07585f0bb743eb515c478869d34a1be7756be415ccec224a13af7352";
const byteCode = "608060405234801561001057600080fd5b5061019c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063262a9dff14610046578063967e6e6514610064578063d5dcf12714610082575b600080fd5b61004e6100b2565b60405161005b9190610125565b60405180910390f35b61006c6100b8565b6040516100799190610125565b60405180910390f35b61009c600480360381019061009791906100e9565b6100c1565b6040516100a99190610125565b60405180910390f35b60005481565b60008054905090565b6000816000819055506000549050919050565b6000813590506100e38161014f565b92915050565b6000602082840312156100ff576100fe61014a565b5b600061010d848285016100d4565b91505092915050565b61011f81610140565b82525050565b600060208201905061013a6000830184610116565b92915050565b6000819050919050565b600080fd5b61015881610140565b811461016357600080fd5b5056fea2646970667358221220f6c931a1c922f3a6ad501eeea3bcb9fb1f94fd51a7df40d510fcdb44f873d53864736f6c63430008070033";
const byteCodeBuffer = Buffer.from(byteCode, "hex");
const privatekeyBuffer = Buffer.from(privatekey, "hex");

web3.eth.getTransactionCount(account, (error, txCount)=>{
    console.log(txCount);
    if (error){
        console.log("Error", error)
    }
    else{
        const txObj = {
            nonce: web3.utils.toHex(txCount),
            data: byteCodeBuffer,
            gasLimit:  web3.utils.toHex(1000000),
            gasPrice:  web3.utils.toHex(web3.utils.toWei("10","gwei"))
        }
        const tx = new Tx.Transaction(txObj, { chain: "ropsten", hardfork: "petersburg" });
        tx.sign(privatekeyBuffer);
        const serializedTx = tx.serialize();
        const raw = "0x" + serializedTx.toString('hex');
        web3.eth.sendSignedTransaction(raw, (error, txHash)=>{
            if(error){
                console.log("Transaction error", error)
            }
            else{
                console.log("Transaction hash", txHash)
            }


        }).then(receipt =>{
            console.log("Transaction receipt", receipt);
        })
    }
})