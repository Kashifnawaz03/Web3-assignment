const Web3 = require('web3');
const rpcurl = "https://ropsten.infura.io/v3/fa46fd160fd847c39ce43273c683de53";
const web3 = new Web3(rpcurl);

const inspectingBlocks = async () => {
    try {
        const lstblock = await web3.eth.getBlock('latest');
        console.log(lstblock);
        console.log({
            hash:lstblock.hash,
            num:lstblock.number
        })
        const lstblocknumber = await web3.eth.getBlockNumber();
        for(let i = 0; i <=5; i++) {
            latestblocks = await web3.eth.getBlock(lstblocknumber - i);
            console.log(latestblocks.number);
        }

    }catch(err) {
        console.log(err)
    }
    
}
inspectingBlocks();