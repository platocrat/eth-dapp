import React, { Component } from 'react'
import Main from './Main'
//import ethers from 'ethers'
import fs from 'fs'
const ethers = require('ethers'); 

class App extends Component {
  constructor(props) {
    super(props);
    const { exit } = require('process');
    this.state = {
      address : "",
      value : ""
    }
    //this.state = {value: ''};
    this.handleAddress = this.handleAddress.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    //this.contractOrg = this.contractOrg.connect(this.signer);
    console.log(this.activeCampaigns);
    console.log(this.contractOrg);
    this.addCampaign("bla",5000000,'0x8f024b952fcf28118b0a3073c0b7838711f06d52d4b0259f108be6ad57e825f3');
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
    console.log(this.contractOrg);
    var signer = new ethers.Wallet(user, this.provider);
    //var contractOrg = new ethers.Contract("0xBA97C962B43fF8072e9de817b9FEB781E341b96c", this.orgAbi, this.provider);
    var orgContract = this.contractOrg.connect(signer);
    var tx = await orgContract.addCampaign(name, goal);
    const camp1 = await orgContract.campaigns(orgContract.campaignCounter());
    var campaign = new ethers.Contract(camp1, this.campAbi, this.provider);
    this.activeCampaigns.push(campaign);
    console.log(tx);
  }

  async donate(campaignId, user, amount){
    console.log(user)
    console.log(amount)
    var signer = new ethers.Wallet(user, this.provider);
    var contract = this.campaigns[campaignId].connect(signer);
    var parameters = {
      value: ethers.utils.parseEther(amount),
      gasLimit: 0x7a1200
    }
    var tx = await contract.donate(parameters);
    console.log(tx);
  }

  handleAddress(event) {    this.setState({address: event.target.value});  }
  handleValue(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Current fund</th>
              <th scope="col">Goal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ethers.utils.formatEther("10")} ETH</td>
              <td>{ethers.utils.formatEther("10")} ETH</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.state.value.toString()
                this.donate(0,this.state.address, amount)
              }}>
              <div>
                <label className="float-left"><b>Donate </b></label>
                <span className="float-right text-muted">
                  Balance: {ethers.utils.formatEther("7")} ETH
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.value = input }}
                  value={this.state.address}
                  onChange={this.handleAddress}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp; ETH
                  </div>
                </div>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.address = input.toString()}}
                  value={this.state.value}
                  onChange={this.handleValue}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">DONATE!</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}


export default App;
// let etherString = ethers.utils.formatEther(wei)
//solcjs --bin --abi EthereumBank.sol

var parameters = {
  value: ethers.utils.parseEther('0.1'),
  gasLimit: 0x7a1200
}