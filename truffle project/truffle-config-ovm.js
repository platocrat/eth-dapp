const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const infuraURL = process.env.INFURA_URL;
const mnemonic = process.env.MNEMONIC;
module.exports = {
  contracts_directory: "./contractsL2",
  contracts_build_directory: "./build/optimism-contracts",
  networks: {
    optimistic_kovan: {
      network_id: 69,
      chainId: 69,
      gas: 1650000,
      gasPrice: 15000000,
      provider: function () {
        return new HDWalletProvider(mnemonic, infuraKey, 0, 1);
      }
    }
  },
  compilers: {
    solc: {
      version: 'node_modules/@eth-optimism/solc',
      settings: {
        optimizer: {
          enabled: true,
          runs: 1
        }
      }
    },
  },
  plugins: [ 'truffle-plugin-verify' ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
};
