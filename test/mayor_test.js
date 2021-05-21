const Mayor = artifacts.require("Mayor");
const ethers = require("ethers");

contract("Mayor", async accounts => {
    it("Should be deployed", () => {
        Mayor.deployed();
    });

    it("Should correctly compute envelope", () => {
        // precompute the envelope and automatically encode it
        let _envelope = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["uint", "bool", "uint"], [1, true, 1]));

        // check if the envelope returned by compute envelope is the same as the one we computed before
        return Mayor.deployed()
        .then(instance => instance.compute_envelope.call(1, true, 1))
        .then(envelope => assert.equal(envelope, _envelope));
    });

    it("Should correctly cast envelopes", async () => {

        let envelope = await Mayor.deployed()
        .then(instance => instance.compute_envelope.call(1, true, 1));

        // console.log(envelope);
        
        return Mayor.deployed()
        .then(instance => instance.cast_envelope.call(envelope));

    })

})