const assertRevert = require('../helpers/assertRevert');
const MintableToken = artifacts.require('Token');
const evmThrewRevertError = require('../helpers/vmerror.js');

contract('Token', function([owner, anotherAccount, recipient]) {

    beforeEach(async function() {
        this.token = await MintableToken.new({ from: owner });
    });


    describe('mint', function() {
        const amount = 100;

        describe('when the sender is the token owner', function() {
            const from = owner;

            describe('when the token was not finished', function() {
                it('mints the requested amount', async function() {
                    await this.token.mint(owner, amount, { from });

                    const balance = await this.token.balanceOf(owner);
                    assert.equal(balance, amount);
                });


                it('mints the requested amount for another account', async function() {
                    await this.token.mint(anotherAccount, amount, { from });

                    const balance = await this.token.balanceOf(anotherAccount);
                    assert.equal(balance, amount);
                });

                it('returns the correct total amount of tokens when none are minted', async function() {
                    const totalSupply = await this.token.totalSupply();
                    assert.equal(totalSupply, 0);
                });

                it('returns the correct total amount of tokens when two are minted', async function() {
                    await this.token.mint(owner, amount, { from });
                    await this.token.mint(anotherAccount, amount, { from });
                    const totalSupply = await this.token.totalSupply();
                    assert.equal(totalSupply, 200);
                });
            });

        });

    });

    describe('transfer', function() {

        describe('when the recipient is not the zero address', function() {
            const to = recipient;
            describe('when the sender does not have enough balance', function() {
                const amount = 101;

                it('reverts', async function() {
                    await assertRevert(this.token.transfer(to, amount, { from: anotherAccount }));
                });
            });

            describe('when the sender has enough balance', function() {
                const amount = 100;
                const from = owner;


                beforeEach(async function() {

                    await this.token.mint(anotherAccount, amount, { from });
                    const balance = await this.token.balanceOf(anotherAccount);
                });


                it('transfers the requested amount', async function() {

                    await this.token.transfer(to, amount, { from: anotherAccount });

                    const senderBalance = await this.token.balanceOf(anotherAccount);
                    assert.equal(senderBalance, 0);

                    const recipientBalance = await this.token.balanceOf(to);
                    assert.equal(recipientBalance, amount);
                });

                it('emits a transfer event', async function() {
                    const { logs } = await this.token.transfer(to, amount, { from: anotherAccount });
                    assert.equal(logs.length, 1);
                    assert.equal(logs[0].event, 'Transfer');
                    assert.equal(logs[0].args.from, anotherAccount);
                    assert.equal(logs[0].args.to, to);
                    assert(logs[0].args.value.eq(amount));
                });

            });
        });

    });
});