const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const eth = web3.eth;
const cDef = require('./build/contracts/AmbrToken.json');
//console.log(cDef);

const contract = web3.eth.contract(cDef.abi);
const code = cDef.bytecode;
//console.log(code);
const instance = contract.new({ from: '0x899E58A8F7f3352048C332E2623a974902b9Fe1A', gas: 5721975, data: code });
console.log('deployed');

async function waitBlock() {
    while (true) {
        let receipt = web3.eth.getTransactionReceipt(instance.transactionHash);
        if (receipt && receipt.contractAddress) {
            console.log("Your contract has been deployed at " + receipt.contractAddress);
            console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");

            console.log("here 0");
            const contract2 = web3.eth.contract(cDef.abi);
            console.log("here 1");
            var inst = contract2.at(receipt.contractAddress);
            console.log("here");
            inst.mint('0x47D61767f6893b435AB48Da7acA93A22A912B3fF', 1000000000000000000, { from: '0x899E58A8F7f3352048C332E2623a974902b9Fe1A' }, (e, o) => {
                console.log(e);
                console.log(o);
            });

            inst.balanceOf('0x47D61767f6893b435AB48Da7acA93A22A912B3fF', (e, o) => {
                console.log(e);
                console.log(o);
            });
            break;
        }
        console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
        await sleep(4000);
    }
}

waitBlock();


/*
//console.log(contracts);
// ABI description as JSON structure
let abi = JSON.parse(contracts.abi);

// Smart contract EVM bytecode as hex
let code = '0x' + contracts.bin;

// Create Contract proxy class
let AmbrToken = web3.eth.contract(abi);

// Unlock the coinbase account to make transactions out of it
console.log("Unlocking coinbase account");
var password = "";
try {
    web3.personal.unlockAccount(web3.eth.coinbase, password);
} catch (e) {
    console.log(e);
    return;
}


console.log("Deploying the contract");
let contract = 

// Transaction has entered to geth memory pool
console.log("Your contract is being deployed in transaction at http://testnet.etherscan.io/tx/" + contract.transactionHash);

// http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// We need to wait until any miner has included the transaction
// in a block to get the address of the contract
async function waitBlock() {
    while (true) {
        let receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
        if (receipt && receipt.contractAddress) {
            console.log("Your contract has been deployed at http://testnet.etherscan.io/address/" + receipt.contractAddress);
            console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");
            break;
        }
        console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
        await sleep(4000);
    }
}

waitBlock();

*/