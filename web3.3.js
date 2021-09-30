const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
const rpcURL = "https://ropsten.infura.io/v3/fa46fd160fd847c39ce43273c683de53";

const web3 = new Web3(rpcURL);
const account1 = "0x579a84923cB461E5a130B1Bfd28480834781C470";
const privatekey = "d225ffdc07585f0bb743eb515c478869d34a1be7756be415ccec224a13af7352";
const account1_privatekey = Buffer.from(privatekey, 'hex');
const account2 = "0x939372C2d0b107f08f714B7156343768d39488E2";

//Async function

/*const fundTranfer = async ()=> {
    try {
        const txCount = await web3.eth.getTransactionCount(account1);
        const txObject = {
            nonce:      web3.utils.toHex(txCount),
            to:         account2,
            value:      web3.utils.toHex(web3.utils.toWei('0.1','ether')),
            gasLimit:   web3.utils.toHex(21000),
            gasPrice:   web3.utils.toHex(web3.utils.toWei('10','gwei'))
    
        }
        const tx = new Tx(txObject, { 'chain':'ropsten' });
        tx.sign(account1_privatekey);
        const TXSERIALIZED = tx.serialize();
        const raw = '0x' + TXSERIALIZED.toString('hex');
        const response = await web3.eth.sendSignedTransaction(raw);
        console.log(response);
    }catch(err) {
        console.log(err);
    }
}

fundTranfer();*/


web3.eth.getTransactionCount(account1, (error,txCount)=>{
    console.log("nounce value :", txCount);
    const txObject = {
        nonce:     web3.utils.toHex(txCount),
        to:         account2,
        value:      web3.utils.toHex(web3.utils.toWei('0.1','ether')),
        gasLimit:   web3.utils.toHex(21000),
        gasPrice:   web3.utils.toHex(web3.utils.toWei('10','gwei'))

    }
    const tx = new Tx(txObject, {'chain':'ropsten'});
    tx.sign(account1_privatekey);

    const serialize = tx.serialize();
    const txHex = '0x'+serialize.toString('hex');
    web3.eth.sendSignedTransaction(txHex,(error, txHash) => {
        if(!error){
            console.log("Transaction Successfull" ,txHash);
        }else{
            console.log("Transaction error :",error);
        }
        
    });
})

