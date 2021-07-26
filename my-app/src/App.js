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
          },
          {
            "internalType": "string",
            "name": "_description",
            "type": "string"
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
          },
          {
            "internalType": "string",
            "name": "_description",
            "type": "string"
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
        "name": "description",
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
      campId: "",
      address : "",
      value : "",
      campName : "",
      campGoal : "",
      campUser : "",
      campDescription : "",
      ID: "",
      recepient: "",
      memberAddress: "",
      email: "",
      loading: true
    }

    
    //this.state = {value: ''};
    this.handleCampId = this.handleCampId.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleGoal = this.handleGoal.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleRecepient = this.handleRecepient.bind(this);
    this.handleID = this.handleID.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleMemberAddress = this.handleMemberAddress.bind(this);
    this.provider = new ethers.providers.InfuraProvider("ropsten", "52a080cad405419aa4318047bde7087f"); 
    this.signer = new ethers.Wallet('0x8f024b952fcf28118b0a3073c0b7838711f06d52d4b0259f108be6ad57e825f3', this.provider);
    this.activeCampaigns = [new ethers.Contract("0x14159d166803E259F838771E4f5959a2Cf501F84", this.campAbi, this.provider)];
    this.finishedCampaigns = [];
    this.virtualCamps=[];
    this.emails = {};
    //await deploy();
    
    this.contractOrg = new ethers.Contract("0x8921E155c34fdA42b1Fe7779b448C3ab457091b6", this.orgAbi, this.provider);
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
      address: "0x8921E155c34fdA42b1Fe7779b448C3ab457091b6",
      fromBlock: 0,
      topics: [ethers.utils.id("goalReached(uint,uint,string,address[])")]
    };
    this.logs = this.provider.getLogs(filter);
    setInterval(this.loadBlockchainData(), 60000);

  }

  async loadBlockchainData() {
    this.setState({loading : true});
    var parameters = {
      value: ethers.utils.parseEther('0.1'),
      gasLimit: 0x7a1200
    }
    var virtualCamps=[];
    var counter = await this.contractOrg.campaignCounter();
    for (let i = 1; i < counter; i++) {
      var Campaign = {
        name: "",
        id: "",
        currFund: "",
        goal: "",
        description: ""
      }
      var addr = await this.contractOrg.campaigns(i);
      console.log(addr);
      var camp = new ethers.Contract(addr, this.campAbi, this.provider);
      camp.on("*", (from, to, value, event) => {
        console.log("event: ", event);
        this.sendMail();
      });
      console.log(camp)
      var name = await camp.name();
      var id = await camp.id();
      var currFund = await camp.currFund();
      var goal = await camp.goal();
      var description = await camp.description();
      Campaign.name = name.toString();
      Campaign.id = id.toString();
      Campaign.currFund = ethers.utils.formatEther(currFund.toString());
      Campaign.goal = ethers.utils.formatEther(goal.toString());
      Campaign.description = description.toString();
      virtualCamps.push(Campaign);
    }
    this.virtualCamps = virtualCamps;
    console.log(this.virtualCamps);
    this.setState({loading : false});
  }

  async sendMail() {
    var params = {
      'to_email': 'karlo.v.cihlar@gmail.com'
    }

    emailjs.send('service_uthqgcf', 'template_ecyce4i', params).then(function(res) {
      console.log('mail sent!');
    } )
    return 0;
  }

  async addCampaign(name, goal, description, user) {
    console.log(this.contractOrg);
    user = '0x' + user;
    var signer = new ethers.Wallet(user, this.provider);
    //var contractOrg = new ethers.Contract("0xBA97C962B43fF8072e9de817b9FEB781E341b96c", this.orgAbi, this.provider);
    const orgContract = this.contractOrg.connect(signer);
    goal = ethers.utils.parseEther(goal);
    var parameters = {
      gasLimit: 0x7a1200
    }
    var tx = await orgContract.addCampaign(name, goal, description, parameters);
    const camp1 = await orgContract.campaigns(orgContract.campaignCounter());
    var campaign = new ethers.Contract(camp1, this.campAbi, this.provider);
    var Campaign = {
      name: "",
      id: "",
      currFund: "",
      goal: "",
      description: ""
    }
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
    this.setState({
      campName: '',
      campGoal: '',
      campDescription: '',
      campUser: '',
      loading : true
    });
  }

  async donate(campaignId, user, amount, email){
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
    if (this.emails[campaignId]){
      this.emails[campaignId].push(email);
    } else {
      this.emails = {[campaignId] : [email]};
    }
    console.log(this.emails);
    console.log(tx);
    this.sendMail()
    this.loadBlockchainData();
    this.setState({
      campId: "",
      address: "",
      value: "",
      email: ""
    });
    this.setState({loading : true});
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
    this.loadBlockchainData();
    this.setState({
      ID: '',
      recepient: ''
    });
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
    this.setState({
      memberAddress: ''
    });
  }

  handleCampId(event) {    this.setState({campId: event.target.value});  }  
  handleAddress(event) {    this.setState({address: event.target.value});  }
  handleValue(event) {    this.setState({value: event.target.value});  }
  handleName(event) {    this.setState({campName: event.target.value});  }
  handleGoal(event) {    this.setState({campGoal: event.target.value});  }
  handleUser(event) {    this.setState({campUser: event.target.value});  }
  handleDescription(event) { this.setState({campDescription: event.target.value}); } 
  handleID(event) {    this.setState({ID: event.target.value});  }
  handleRecepient(event) {    this.setState({recepient: event.target.value});  }
  handleEmail(event) {  this.setState({email: event.target.value}); }
  handleMemberAddress(event) {    this.setState({memberAddress: event.target.value});  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const campList = () => {
      console.log(this.loading);
      if (!this.state.loading){
      let content = [];
      console.log(this.virtualCamps);
      for (let i = 0; i < this.virtualCamps.length; i++) {
          content.push(<CampaignRow
          name={this.virtualCamps[i].name}
          id={this.virtualCamps[i].id}
          currFund={this.virtualCamps[i].currFund}
          goal={this.virtualCamps[i].goal}
          description={this.virtualCamps[i].description} />);
      }
      return content;
    }
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
                this.donate(this.state.campId,this.state.address, amount, this.state.email)
              }}>
              <div>
                <label className="float-left"><b>Donate </b></label>
                <div> </div>
                <span className="float-right text-muted"> Campaign ID: </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.value = input }}
                  value={this.state.campId}
                  onChange={this.handleCampId}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                  </div>
                </div>
              </div>
                <span className="float-right text-muted"> Your wallet private key: </span>
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
              <span className="float-right text-muted"> Email: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.value = input }}
                  value={this.state.email}
                  onChange={this.handleEmail}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">DONATE!</button>
            </form>
          <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                this.addCampaign(this.state.campName, this.state.campGoal, this.state.campDescription, this.state.campUser)
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
              <span className="float-right text-muted"> Campaign description: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.address = input.toString()}}
                  value={this.state.campDescription}
                  onChange={this.handleDescription}
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