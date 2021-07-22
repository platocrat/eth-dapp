const Campaign = artifacts.require('Campaign')
const Organisation = artifacts.require('Organisation')

module.exports = async function(deployer, network, accounts) {
  // Deploy Campaign
  //await deployer.deploy(Campaign, 1, "bla", 500)
  //const campaign = await Campaign.deployed()

  // Deploy Organisation
  await deployer.deploy(Organisation)
  const organisation = await Organisation.deployed()
}