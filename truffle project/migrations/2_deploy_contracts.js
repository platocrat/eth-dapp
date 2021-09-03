const Organisation = artifacts.require('Organisation');

module.exports = function (deployer) {
  deployer.deploy(Organisation);
};
