var Token = artifacts.require("./Token.sol");

module.exports = function(deployer) {
    var token;
    const testAmount = 10000000000000000000;

    deployer.then(function() {
        return Token.new();
    }).then(function(instance) {
        token = instance;
    }).then(function() {
        console.log(token.address);
        return token.mint('0x47316Df453e8C9f7C942f5dCbFdF66D518d61f2D', testAmount);
    }).then(function() {
        console.log(token.address);
        return token.balanceOf('0x47316Df453e8C9f7C942f5dCbFdF66D518d61f2D');
    }).then(function(ama) {
        console.log(ama);
    });
};