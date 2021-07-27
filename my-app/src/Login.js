import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import emailjs from 'emailjs-com'
import {BrowserRouter, Route, Link} from "react-router-dom"
const ethers = require('ethers'); 
const color="#F9F3F3";

class Login extends Component{
    
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
        this.signer = new ethers.Wallet('0x8f024b952fcf28118b0a3073c0b7838711f06d52d4b0259f108be6ad57e825f3', this.provider);
        this.activeCampaigns = [new ethers.Contract("0x14159d166803E259F838771E4f5959a2Cf501F84", this.campAbi, this.provider)];
        this.finishedCampaigns = [];
        this.virtualCamps=[];
        this.emails = {};
        //await deploy(); 
        
        this.contractOrg = new ethers.Contract("0x27bDe75fA260b97F1fB9122fA539904F873b1059", this.orgAbi, this.provider);
        //this.contractOrg = this.contractOrg.connect(this.signer);
        //this.addCampaign("bla",5000000,'0x8f024b952fcf28118b0a3073c0b7838711f06d52d4b0259f108be6ad57e825f3');
    
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
        this.sleep = (milliseconds) => {
          return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        //this.loadBlockchainData();
    
      }
    
      async loadBlockchainData() {
        var parameters = {
          value: ethers.utils.parseEther('0.1'),
          gasLimit: 0x7a1200
        }
        var virtualCamps=[];
        var counter = await this.contractOrg.campaignCounter();
        for (let i = 1; i < counter+1; i++) {
          var Campaign = {
            name: "",
            id: "",
            currFund: "",
            goal: "",
            description: "",
            mails: []
          }
          var addr = await this.contractOrg.campaigns(i);
          console.log(addr);
          var camp = new ethers.Contract(addr, this.campAbi, this.provider);
          camp = camp.connect(this.signer);
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
          var mails = [];
          var counter = await camp.mailCount();
          for(var j=0; j<counter; j++){
            var mail = await camp.mails(j);
            mails.push(mail);
            console.log(mail);
          }
          Campaign.name = name.toString();
          Campaign.id = id.toString();
          Campaign.currFund = ethers.utils.formatEther(currFund.toString());
          Campaign.goal = ethers.utils.formatEther(goal.toString());
          Campaign.description = description.toString();
          Campaign.mails = mails;
          virtualCamps.push(Campaign);
        }
        this.virtualCamps = virtualCamps;
        console.log(this.virtualCamps);
        this.setState({loading : false});
      }
    
      async sendMail(campaignId) {
        for(var i=0; i<this.virtualCamps.length; i++){
          if (this.virtualCamps[i].campaignId=campaignId){
            for(var j=0; j<this.virtualCamps[i].mails.length; j++){
              var params = {
                'to_email': this.virtualCamps[i].mails[j],
                'campaign_name': this.virtualCamps[i].name,
                'goal':this.virtualCamps[i].goal,
                'curr_fund':this.virtualCamps[i].currFund
          
              }
              emailjs.send('service_uthqgcf', 'template_ecyce4i', params).then(function(res) {
              console.log('mail sent!');
              } )
            }
          }
        }
        
    
        
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
        campaign.on('goalReached', (totalFund, campaignId, name) => this.sendMail(campaignId))
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
        var tx = await contract.donate(email,parameters);
        if (this.emails[campaignId]){
          this.emails[campaignId].push(email);
        } else {
          this.emails = {[campaignId] : [email]};
        }
        console.log(this.emails);
        console.log(tx);
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
        return(
          <div id="content" className="mt-4">
          
                    <div className="card-body">
          
                    <form className="mb-3">
                        <div>
                          <h3 className="float-left"><b>LOGIN</b></h3>
                        </div>
                        <span className="float-right text-muted"> Your Wallet secret key: </span>
                        <div className="input-group mb-4">
                          <input
                            type="text"
                            //ref={(input) => { this.input.value = input }}
                            value={this.state.address}
                            onChange={this.handleAddress}
                            className="form-control form-control-lg"
                            placeholder="Enter your wallet secret key (without 0x)"
                            required />
                            </div>
                    </form>
                    <Link to="/member"> <button type="submit" className="btn btn-info btn-block btn-lg" disabled={!this.state.address}>LOGIN</button> </Link>
                    </div>
                    </div>
        );
    }
}
export default Login;