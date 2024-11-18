const ChiefValidation = artifacts.require("ChiefValidation");
const SafeVote = artifacts.require("SafeVote");

module.exports = function (deployer) {
  deployer.deploy(ChiefValidation);
  deployer.deploy(SafeVote);
};