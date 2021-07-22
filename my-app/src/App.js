import React, { Component } from 'react'
import Main from './Main'
//import ethers from 'ethers'
import fs from 'fs'
const ethers = require('ethers'); 

class App extends Component {
  constructor() {
  super();
  const { exit } = require('process');
  this.provider = new ethers.providers.InfuraProvider("ropsten", "52a080cad405419aa4318047bde7087f"); 
  this.signer = new ethers.Wallet('0x8f024b952fcf28118b0a3073c0b7838711f06d52d4b0259f108be6ad57e825f3', this.provider);
  this.activeCampaigns = [];
  this.finishedCampaigns = [];

    //await deploy();
  this.orgAbi = [
    {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "campaignCounter",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "campaigns",
          "outputs": [
            {
              "internalType": "contract Campaign",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "members",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_goal",
              "type": "uint256"
            }
          ],
          "name": "addCampaign",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_member",
              "type": "address"
            }
          ],
          "name": "addMember",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "donate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
    ];
  this.campAbi =[
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_goal",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalFund",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "funders",
          "type": "address[]"
        }
      ],
      "name": "goalReached",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "currFund",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "funders",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "goal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "id",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "donate",
      "outputs": [
        {
          "internalType": "bool",
          "name": "sufficient",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "getBalanceInEth",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }

  ];
  this.contractOrg = new ethers.Contract("0xBA97C962B43fF8072e9de817b9FEB781E341b96c", this.orgAbi, this.provider);
  //this.contractOrg = contractOrg.connect(signer);
  }

  async loadBlockchainData() {
    var owner = await this.contractOrg.owner();
    this.owner = owner;
    var parameters = {
      value: ethers.utils.parseEther('0.1'),
      gasLimit: 0x7a1200
    }
  }

  async addCampaign(name, goal, user) {
    var signer = new ethers.Wallet(user, this.provider);
    var orgContract = this.contractOrg.connect(signer);
    var tx = await orgContract.addCampaign(name, goal);
    const camp1 = await orgContract.campaigns(orgContract.campaignCounter());
    var campaign = new ethers.Contract(camp1, this.campAbi, this.provider);
    this.activeCampaigns.push(campaign);
    console.log(tx);
  }

  async donate(campaignId, user, amount){
    var signer = new ethers.Wallet(user, this.provider);
    var contract = this.campaigns[campaignId].connect(signer);
    var parameters = {
      value: ethers.utils.parseEther(amount),
      gasLimit: 0x7a1200
    }
    var tx = await contract.donate(parameters);
    console.log(tx);
  }
}


export default App;
// let etherString = ethers.utils.formatEther(wei)
//solcjs --bin --abi EthereumBank.sol

var parameters = {
  value: ethers.utils.parseEther('0.1'),
  gasLimit: 0x7a1200
}