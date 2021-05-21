const Mayor = artifacts.require("Mayor");
const ethers = require("ethers");

contract("Mayor", accounts => {
    it("Should be deployed", () => {
        Mayor.deployed();
    });

    it("Should correctly compute envelope", () => {
        // precompute the envelope and automatically encode it
        let _envelope = ethers.utils.solidityKeccak256([ 'uint', 'bool', 'uint' ], [ 1, true, 1 ]);

        // check if the 
        Mayor.deployed()
        .then(instance => instance.compute_envelope.call(1, true, 1))
        .then(envelope => assert.equal(envelope, _envelope));
    });
})