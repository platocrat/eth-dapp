import React, { Component } from 'react'
import Main from './Main'
//import ethers from 'ethers'
import fs from 'fs'
import emailjs from 'emailjs-com'
import 'bootstrap/dist/css/bootstrap.min.css'
import CampaignRow from "./campaignRow"
const ethers = require('ethers'); 

class App extends Component {

  constructor(props) {
    super(props);    
    const { exit } = require('process');

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
        "type": "function",
        "constant": true
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
        "type": "function",
        "constant": true
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
        "type": "function",
        "constant": true
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
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
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
      }
    ];
    this.campAbi = [
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
        "inputs": [],
        "name": "finished",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
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
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "fundings",
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
            "internalType": "address payable",
            "name": "_recipient",
            "type": "address"
          }
        ],
        "name": "withdraw",
        "outputs": [
          {
            "internalType": "bool",
            "name": "sufficient",
            "type": "bool"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      }
    ];

    this.state = {
      address : "",
      value : "",
      campName : "",
      campGoal : "",
      campUser : "",
      ID: "",
      recepient: "",
      memberAddress: ""
    }

    Campaign = {
      name: "",
      id: "",
      currFund: "",
      goal: "",
      description: ""
    }
    //this.state = {value: ''};
    this.handleAddress = this.handleAddress.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleGoal = this.handleGoal.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handleRecepient = this.handleRecepient.bind(this);
    this.handleID = this.handleID.bind(this);
    this.handleMemberAddress = this.handleMemberAddress.bind(this);
    this.provider = new ethers.providers.InfuraProvider("ropsten", "52a080cad405419aa4318047bde7087f"); 
    this.signer = new ethers.Wallet('0x8f024b952fcf28118b0a3073c0b7838711f06d52d4b0259f108be6ad57e825f3', this.provider);
    this.activeCampaigns = [new ethers.Contract("0x14159d166803E259F838771E4f5959a2Cf501F84", this.campAbi, this.provider)];
    this.finishedCampaigns = [];

    //await deploy();
    
    this.contractOrg = new ethers.Contract("0x87E90967C2B34E425a1B2c357BEfE8DC201d06A7", this.orgAbi, this.provider);
    //this.contractOrg = this.contractOrg.connect(this.signer);
    //this.addCampaign("bla",5000000,'0x8f024b952fcf28118b0a3073c0b7838711f06d52d4b0259f108be6ad57e825f3');
    console.log(this.activeCampaigns);
    console.log(this.contractOrg);

    /*const filter = {
      address: this.contractOrg.address,
      topics: [
          // the name of the event, parnetheses containing the data type of each event, no spaces
          ethers.utils.id("goalReached(uint,uint,string,address[])")
      ]}*/
      
    const filter = {
      address: "0x87E90967C2B34E425a1B2c357BEfE8DC201d06A7",
      fromBlock: 0,
      topics: [ethers.utils.id("goalReached(uint,uint,string,address[])")]
    };
    this.logs = this.provider.getLogs(filter);

  }

  async loadBlockchainData() {
    var owner = await this.contractOrg.owner();
    this.owner = owner;
    var parameters = {
      value: ethers.utils.parseEther('0.1'),
      gasLimit: 0x7a1200
    }
    for (let i = 0; i < this.activeCampaigns.length; i++) {
      var name = await this.activeCampaigns[i].name();
      var id = await this.activeCampaigns[i].id();
      var currFund = await this.activeCampaigns[i].currFund();
      var goal = await this.activeCampaigns[i].goal();
      this.activeCampaigns[i].name = name.toString();
      this.activeCampaigns[i].id = id.toString();
      this.activeCampaigns[i].currFund = currFund.toString();
      this.activeCampaigns[i].goal = goal.toString();
    }
  }

  async sendMail() {
    var params = {
      'to_email': 'mculyak@gmail.com'
    }

    emailjs.send('service_uthqgcf', 'template_ecyce4i', params).then(function(res) {
      console.log('KITA!');
    } )
    return 0;
  }

  async addCampaign(name, goal, user) {
    console.log(this.contractOrg);
    user = '0x' + user;
    var signer = new ethers.Wallet(user, this.provider);
    //var contractOrg = new ethers.Contract("0xBA97C962B43fF8072e9de817b9FEB781E341b96c", this.orgAbi, this.provider);
    const orgContract = this.contractOrg.connect(signer);
    goal = ethers.utils.parseEther(goal);
    var parameters = {
      gasLimit: 0x7a1200
    }
    var tx = await orgContract.addCampaign(name, goal, parameters);
    const camp1 = await orgContract.campaigns(orgContract.campaignCounter());
    var campaign = new ethers.Contract(camp1, this.campAbi, this.provider);
    this.activeCampaigns.push(campaign);
    const filter = {
      address: campaign.address,
      topics: [
          // the name of the event, parnetheses containing the data type of each event, no spaces
          ethers.utils.id("goalReached(uint,uint,string,address[])")
      ]
  }
    //campaign.on(filter, this.campaignFinished);
    campaign.on('goalReached', (totalFund, campaignId, name) => this.sendMail())
    console.log(tx);
    console.log(this.logs);
  }

  async donate(campaignId, user, amount){
    console.log(user)
    console.log(amount)
    var signer = new ethers.Wallet(user, this.provider);
    var campAddress = await this.contractOrg.campaigns(parseInt(campaignId, 10));
    var contract = new ethers.Contract(campAddress, this.campAbi, this.provider);
    contract = contract.connect(signer);
    var parameters = {
      value: ethers.utils.parseEther(amount),
      gasLimit: 0x7a1200
    }
    var tx = await contract.donate(parameters);
    console.log(tx);
    this.sendMail()
  }

  async withdraw(campaignId, recepient) {
    var campAddress = await this.contractOrg.campaigns(parseInt(campaignId, 10));
    console.log(campAddress);
    console.log(recepient);
    console.log(parseInt(campaignId,10));
    var contract = new ethers.Contract(campAddress, this.campAbi, this.provider);
    var contract = contract.connect(this.signer);
    var parameters = {
      gasLimit: 0x7a1200
    }
    console.log(contract);
    var tx = await contract.withdraw(recepient, parameters);
    console.log(tx);
  }

  async campaignFinished() {
    console.log("campaign finished");
  }

  async addMember(memberAddress) {
    const orgContract = this.contractOrg.connect(this.signer);
    var parameters = {
      gasLimit: 0x7a1200
    }
    var tx = await orgContract.addMember(memberAddress, parameters);
    console.log(tx);
  }

  handleAddress(event) {    this.setState({address: event.target.value});  }
  handleValue(event) {    this.setState({value: event.target.value});  }
  handleName(event) {    this.setState({campName: event.target.value});  }
  handleGoal(event) {    this.setState({campGoal: event.target.value});  }
  handleUser(event) {    this.setState({campUser: event.target.value});  }
  handleID(event) {    this.setState({ID: event.target.value});  }
  handleRecepient(event) {    this.setState({recepient: event.target.value});  }
  handleMemberAddress(event) {    this.setState({memberAddress: event.target.value});  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {

    const campList = () => {
      let content = [];
      this.loadBlockchainData();
      for (let i = 0; i < this.activeCampaigns.length; i++) {
        const item = this.activeCampaigns[i];
        content.push(<CampaignRow key = {this.activeCampaigns[i].id}
        name={this.activeCampaigns[i].name}
          id={this.activeCampaigns[i].id}
          currFund={this.activeCampaigns[i].currFund}
          goal={this.activeCampaigns[i].goal}
          description={"blabla"} />);
      }
      return content;
    };

    return (
      /*<div className="App">
      <Main />
      <Login />
    </div>*/

      <div>

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <a class="navbar-brand" href="#"> <b>cryptoBROKE.rs</b></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav">
    <li class="nav-item active">
        <a class="nav-link" href="#"> Home </a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#"> About </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"> Log in/Sign up </a>
      </li>
    </ul>
  </div>
</nav>

      <div id="content" className="mt-3">

      <label className="float-left"><b> Campaigns </b></label>

        {campList()}

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
                <div> </div>
                <span className="float-right text-muted"> Address from: </span>
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
                  </div>
                </div>
              </div>
              <span className="float-right text-muted"> Amount: </span>
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
                    &nbsp;&nbsp;&nbsp; ETH
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">DONATE!</button>
            </form>
          <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                this.addCampaign(this.state.campName, this.state.campGoal, this.state.campUser)
              }}>
              <div>
                <label className="float-left"><b>Create campaign</b></label>
              </div>
              <span className="float-right text-muted"> Campaign name: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.value = input }}
                  value={this.state.campName}
                  onChange={this.handleName}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                  </div>
                </div>
              </div>
              <span className="float-right text-muted"> Campaign goal: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.address = input.toString()}}
                  value={this.state.campGoal}
                  onChange={this.handleGoal}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
              </div>
              <span className="float-right text-muted"> Your wallet private key: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.address = input.toString()}}
                  value={this.state.campUser}
                  onChange={this.handleUser}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">SUBMIT!</button>
            </form>
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                this.withdraw(this.state.ID, this.state.recepient)
              }}>
              <div>
                <label className="float-left"><b>Withdraw ETH</b></label>
              </div>
              <span className="float-right text-muted"> Campaign ID: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.value = input }}
                  value={this.state.ID}
                  onChange={this.handleID}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                  </div>
                </div>
              </div>
              <span className="float-right text-muted"> Recepient wallet address: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.address = input.toString()}}
                  value={this.state.recepient}
                  onChange={this.handleRecepient}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">WITHDRAW!</button>
            </form>
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                this.addMember(this.state.memberAddress)
              }}>
              <div>
                <label className="float-left"><b>Add organisation member</b></label>
              </div>
              <span className="float-right text-muted"> New member wallet address: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.value = input }}
                  value={this.state.memberAddress}
                  onChange={this.handleMemberAddress}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">ADD MEMBER</button>
            </form>
            </div>
        </div>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
<script type="text/javascript">
(function() {
emailjs.init("user_gzsTSWT9xHNSKVd7W1EDK")})();
</script>
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