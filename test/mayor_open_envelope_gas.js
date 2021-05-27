const Mayor = artifacts.require("Mayor");
const ethers = require("ethers");

// to store the contract's instance
instance = null;

contract("Mayor, open_envelope gas test", async accounts => {
    it("Should test the constructor", async () => {
        instance = await Mayor.new(accounts[0], accounts[1], 3, {from: accounts[0]})

        return instance.candidate()
        .then(addr => {
            assert.equal(addr, accounts[0])
        })
        
    });

    it("Should estimate gas for open_envelope with false doblon", async() => {

        // compute three envelopes
        envelope1 = await instance.compute_envelope(1, true, 1, {from: accounts[2]});
        envelope2 = await instance.compute_envelope(1, false, 1, {from: accounts[3]});
        envelope3 = await instance.compute_envelope(1, true, 1, {from: accounts[4]});

        // cast envelopes
        await instance.cast_envelope(envelope1, {from: accounts[2]});
        await instance.cast_envelope(envelope2, {from: accounts[3]});
        await instance.cast_envelope(envelope3, {from: accounts[4]});

        gas1 = await instance.open_envelope.estimateGas(1, true, {from: accounts[2], value: 1});   
        gas2 = await instance.open_envelope.estimateGas(1, false, {from: accounts[3], value: 1});   
        gas3 = await instance.open_envelope.estimateGas(1, true, {from: accounts[4], value: 1});   

        console.log("Gas estimate (open_envelope, opening with true doblon): ", gas1, " Gas Units");
        console.log("Gas estimate (open_envelope, opening with false doblon): ", gas2, " Gas Units");
        console.log("Gas estimate (open_envelope, subsequent openings): ", gas3, " Gas Units");

    });
})
