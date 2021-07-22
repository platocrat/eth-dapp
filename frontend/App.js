var react = require('react');
var ethers = require("ethers");
var fs = require("fs");
const { exit } = require('process');
//import { useState } from 'react';
const provider = new ethers.providers.InfuraProvider("ropsten", "52a080cad405419aa4318047bde7087f"); 
const signer = new ethers.Wallet('0x8f024b952fcf28118b0a3073c0b7838711f06d52d4b0259f108be6ad57e825f3', provider);
//var provider = new ethers.getDefaultProvider("networkURL", {projectId, projectSecret}) //za infuru
//const wallet = new ethers.Wallet.fromMnemonic('hammer general bridge west october end fiber media behind depend average swamp');
//const signer = wallet.signer();
//var campaignByteCode = fs.readFileSync('Campaign.bin').toString()
//var campaignAbi = JSON.parse(fs.readFileSync('Campaign.abi').toString())
//var organisationByteCode = fs.readFileSync('Organisation.bin').toString()
//var organisationAbi = JSON.parse(fs.readFileSync('Organisation.abi').toString())
//var contractAddress = null;

//balance = await provider.getBalance("ethers.eth")
//ethers.utils.formatEther(balance)
//"0xBA97C962B43fF8072e9de817b9FEB781E341b96c"
/*const deploy = async() => {
    try {
        var signerWallet = provider.getSigner(0);
        /*var campaign = new ethers.ContractFactory(
            campaignAbi,
            capaignByteCode,
            signerWallet
        );
*//*
        var organisation = new ethers.ContractFactory(
            organisationAbi,
            organisationByteCode,
            signerWallet
        );
        
        var contract1 = await campaign.deploy();
        var contract2 = await organisation.deploy();

        contractAddress1 = contract.address;
        contractAddress2 = contract2.address;
        
    } catch (error) {
        console.log(error);        
    }
};
"uint public campaignCounter",
        "address public owner",
        "mapping(address => uint) public members",
        "mapping(uint => Campaign) public campaigns",
        "constructor()",
        "function addCampaign(uint _id, string memory _name, uint _goal) public",
        "function addMember(address _member) public",
        "function donate(uint _id) external"
*/
async function deposit(signer) {
    const tx = await signer.sendTransaction({
      // ITX deposit contract (same address for all public Ethereum networks)
      to: '0x015C7C7A7D65bbdb117C573007219107BD7486f9',
      // Choose how much ether you want to deposit to your ITX gas tank
      value: ethers.utils.parseUnits('0.1', 'ether')
    })
    // Waiting for the transaction to be mined
    await tx.wait()
  }
async function getBalance() {
    response = await provider.send('relay_getBalance', [signer.address])
    console.log(`Your current ITX balance is ${response.balance}`)
  }
const interactWithBank = async() => {
    //await deploy();
    orgAbi = [
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
    campAbi =[
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
    var contractOrg = new ethers.Contract("0xBA97C962B43fF8072e9de817b9FEB781E341b96c", orgAbi, provider);
    //var wallet = provider.getSigner(1);
    var balance = await provider.getBalance("0xBA97C962B43fF8072e9de817b9FEB781E341b96c");
    console.log(balance.toString());
    contract = contractOrg.connect(signer);

    var balance = await contractOrg.owner();
    
    console.log(balance.toString(10));
    getBalance();
    //deposit(signer);
    getBalance();
    var parameters = {
        value: ethers.utils.parseEther('0.1'),
        gasLimit: 0x7a1200
    }
    var tx = await contract.addCampaign(1,"bla",5000000000000000,{gasLimit: 1001234});
    const camp1 = await contract.campaigns(1);
    var campaign = new ethers.Contract(camp1, campAbi, provider);
    campContract = campaign.connect(signer);
    tx = await campContract.donate(parameters);
    console.log(tx);

    var balance = await campContract.currFund();
    console.log(ethers.utils.formatEther(balance.toString()));
}
module.exports = function(callback){
  interactWithBank();
  exit(0);
}
// let etherString = ethers.utils.formatEther(wei)
//solcjs --bin --abi EthereumBank.sol