import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import emailjs from 'emailjs-com'
import CampaignRow from "./campaignRow"
import{ init } from 'emailjs-com';
init("user_ZYwxMAlLHOgUNKO4wSLBm");
const ethers = require('ethers'); 
const color="#F9F3F3";


class Home extends Component{

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
            "name": "mailCount",
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
            "name": "mails",
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
            "inputs": [
              {
                "internalType": "string",
                "name": "_mail",
                "type": "string"
              }
            ],
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
        this.loadBlockchainData = this.loadBlockchainData.bind(this);
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
        this.provider = new ethers.providers.InfuraProvider("ropsten", "0ea19bbf4c4d49518a0966666ff234f3"); 
        //const url = "http://localhost:7545"
        //this.provider = new ethers.providers.JsonRpcProvider(url);
        this.finishedCampaigns = [];
        this.virtualCamps=[];
        this.subscribed = new Set();

        
        this.contractOrg = new ethers.Contract("0x1e63F0A7b75B80C3823522e91F2d58285ea1a201", this.orgAbi, this.provider);
      }
    
      async loadBlockchainData() {
        var parameters = {
          value: ethers.utils.parseEther('0.1'),
          gasLimit: 0x7a1200
        }
        var virtualCamps=[];
        var counter = await this.contractOrg.campaignCounter();
        for (let i = 1; i <= counter; i++) {
          var Campaign = {
            name: "",
            id: "",
            currFund: "",
            goal: "",
            description: "",
            mails: []
          }
          var addr = await this.contractOrg.campaigns(i);
          var camp = new ethers.Contract(addr, this.campAbi, this.provider);
          var name = await camp.name();
          var id = await camp.id();
          var currFund = await camp.currFund();
          var goal = await camp.goal();
          var description = await camp.description();
          var mails = [];
          var counterMail = await camp.mailCount();
          for(var j=0; j<counterMail; j++){
            var mail = await camp.mails(j);
            mails.push(mail);
          }
          Campaign.name = name.toString();
          Campaign.id = id.toString();
          Campaign.currFund = ethers.utils.formatEther(currFund.toString());
          Campaign.goal = ethers.utils.formatEther(goal.toString());
          Campaign.description = description.toString();
          Campaign.mails = mails;
          virtualCamps.push(Campaign);
          var filter = {
            address: camp.address,
            topics: [
                ethers.utils.id("goalReached(uint,uint,string,address[])")
            ]
          }
          if (!this.subscribed.has(id._hex)) {
            camp.on('goalReached', (totalFund, goal, campaignId, name, mails) => this.sendMail(campaignId, totalFund, goal, name, mails))
            console.log(camp)
            console.log(this.subscribed)
            this.subscribed.add(id._hex)
          }

          
          this.virtualCamps = virtualCamps;
          this.setState({loading : false});


        }
        

        
      }
    
      async sendMail(campaignId, curr_fund, goal, name, mails) {
        var sent=[];
        campaignId = campaignId.toString();
        console.log("proslo");
        for(var i=0; i<mails.length; i++){
          var params = {
            'to_email': mails[i],
            'campaign_name': name,
            'goal': ethers.utils.formatEther(goal),
            'curr_fund': ethers.utils.formatEther(curr_fund)
          }
          if (!sent.includes(mails[i])){
            sent.push(mails[i]);
            emailjs.send('service_mr0tweq', 'template_p2vca7b', params).then(function(res) {
            console.log('mail sent!');
            }); 
          } 
        }
        return 0;
      }
    
    
      async donate(campaignId, amount, email){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        var campAddress = await this.contractOrg.campaigns(parseInt(campaignId, 10));
        var contract = new ethers.Contract(campAddress, this.campAbi, this.provider);
        contract = contract.connect(signer);
        var parameters = {
          value: ethers.utils.parseEther(amount),
          gasLimit: 0x7a120
        }
        var tx = await contract.donate(email,parameters);
        this.setState({
          campId: "",
          address: "",
          value: "",
          email: ""
        });
        var currfund = await contract.currFund();
        currfund = ethers.utils.formatEther(currfund);
        var goal = await contract.goal();
        goal = ethers.utils.formatEther(goal);
        amount = parseFloat(amount,10);
        currfund = parseFloat(currfund,10);
        goal = parseFloat(goal,10);
        console.log(amount, goal, currfund);
        // if ((currfund + amount) >= goal){
        //   let total = currfund + amount;
        //   total = total.toString();
        //   this.sendMail(campaignId, total);
        // }
        //this.setState({loading : true});
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

    render(){
        const campList = () => {

            if (!this.state.loading){
            let content = [];
            for (var i = 0; i < this.virtualCamps.length; i++) {
                content.push(<CampaignRow
                name={this.virtualCamps[i].name}
                id={this.virtualCamps[i].id}
                currFund={this.virtualCamps[i].currFund}
                goal={this.virtualCamps[i].goal}
                description={this.virtualCamps[i].description} />);
            }
            return content;
          }
          else{
            this.loadBlockchainData();
          }
          };
        return(
            <div id="content" className="mt-4" style={{backgroundColor: color}}>

      <h3 className="float-left"><b> CAMPAIGNS </b></h3>
      <div class="row">
        {campList()}
      </div>

        <div className="card mb-6" style={{backgroundColor: color}}>

          <div className="card-body" style={{backgroundColor: color}}>

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.state.value.toString()
                this.donate(this.state.campId, amount, this.state.email)
              }}>
              <div>
                <h4 className="float-left bg-info"><b>DONATE </b></h4>
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
                  placeholder="Enter campaign ID (number)"
                  required />
              </div>
              <span className="float-right text-muted"> Amount: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.address = input.toString()}}
                  value={this.state.value}
                  onChange={this.handleValue}
                  className="form-control form-control-lg"
                  placeholder="Enter amount you are donating (in ETH)"
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
                  placeholder="Enter email"
                  required />
                <small class="w-100 text-muted">Your email is safe with us :)</small>
              </div>
              <button type="submit" className="btn btn-info btn-block btn-lg">DONATE!</button>
            </form>
            </div>
            </div>
            </div>
        )
    }
}

export default Home;