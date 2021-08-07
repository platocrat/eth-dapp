const Campaign = artifacts.require('Campaign')
const Organisation = artifacts.require('Organisation')
const NFT = artifacts.require('SimpleNFT')
const Swapper = artifacts.require('SwapExamples')

module.exports = async function(deployer, network, accounts) {
  // Deploy Campaign
  //await deployer.deploy(Campaign, 1, "bla", 500)
  //const campaign = await Campaign.deployed()

  //Deploy NFT
  await deployer.deploy(NFT)
  const NFTs = await NFT.deployed()
  // Deploy Organisation
  console.log(NFTs.address)
  await deployer.deploy(Organisation, NFTs.address)
  const organisation = await Organisation.deployed()
  //Deploy Swapper
  await deployer.deploy(Swapper, "0xE592427A0AEce92De3Edee1F18E0157C05861564")
  const swapper = await Swapper.deployed()

}