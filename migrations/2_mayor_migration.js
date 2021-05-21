const Mayor = artifacts.require("Mayor");

module.exports = function(deployer, network, accounts) {
    // deploying Mayor contract with account 0 as the mayor candidate,
    // accounts 1 as the escrow, and 3 as the quorum
    deployer.deploy(Mayor, accounts[0], accounts[1], 3);
}