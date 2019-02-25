var Utils = {
    testMint(contract, accounts, amount) {
        return contract.mint(accounts[0], amount);
    }
}
module.exports = Utils