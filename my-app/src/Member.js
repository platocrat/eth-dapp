import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import emailjs from 'emailjs-com'
import Campaign from "./abis/Campaign.json"
import Organisation from "./abis/Organisation.json"
const ethers = require('ethers'); 
const color="#F9F3F3";

class Login extends Component{
    
  constructor(props) {
    super(props);    
    const { exit } = require('process');
    this.campAbi = Campaign.abi;
    this.orgAbi = Organisation.abi;

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
    //this.provider = new ethers.providers.InfuraProvider("ropsten", "52a080cad405419aa4318047bde7087f"); 
    //const url = "http://localhost:7545"
    //this.provider = new ethers.providers.JsonRpcProvider(url);
    this.finishedCampaigns = [];
    this.virtualCamps=[];
    this.subscribed = new Set();

    
    this.contractOrg = new ethers.Contract("0xAc7612eF6e9A1c161D36C1472f85Fb6a46EEfA86", this.orgAbi, this.provider);
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
        this.setState({loading : false});

      }
    
      async addCampaign(name, goal, description) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const orgContract = this.contractOrg.connect(signer);
        goal = ethers.utils.parseEther(goal);
        var parameters = {
          gasLimit: 0x7a1200
        }
        var tx = await orgContract.addCampaign(name, goal, description);
        const camp1 = await orgContract.campaigns(orgContract.campaignCounter());
        var campaign = new ethers.Contract(camp1, this.campAbi, this.provider);
        var Campaign = {
          name: "",
          id: "",
          currFund: "",
          goal: "",
          description: ""
        }
        //campaign.on('goalReached', (totalFund, campaignId, name, adresses) => this.sendMail(campaignId, totalFund))
        this.setState({
          campName: '',
          campGoal: '',
          campDescription: '',
          campUser: '',
          loading : true
        });
      }
    
    
      async withdraw(campaignId, recepient) {
        var campAddress = await this.contractOrg.campaigns(parseInt(campaignId, 10));
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(campAddress);
        console.log(recepient);
        console.log(parseInt(campaignId,10));
        var contract = new ethers.Contract(campAddress, this.campAbi, this.provider);
        var contract = contract.connect(signer);
        var parameters = {
          gasLimit: 0x6a1200
        }
        var tx = await contract.withdraw(recepient, parameters);
        this.setState({
          ID: '',
          recepient: ''
        });
      }
    
    
      async addMember(memberAddress) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const orgContract = this.contractOrg.connect(signer);
        var parameters = {
          gasLimit: 0x7a1200
        }
        var tx = await orgContract.addMember(memberAddress, parameters);
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


    async sendMail(campaignId, curr_fund) {
      var mails=[];
      console.log(campaignId, curr_fund)
      for(var i=0; i<this.virtualCamps.length; i++){
        if (this.virtualCamps[i].campaignId=campaignId){
          for(var j=0; j<this.virtualCamps[i].mails.length; j++){
            var params = {
              'to_email': this.virtualCamps[i].mails[j],
              'campaign_name': this.virtualCamps[i].name,
              'goal':this.virtualCamps[i].goal,
              'curr_fund': curr_fund.toString()
            }
            if (!mails.includes(this.virtualCamps[i].mails[j])){
              mails.push(this.virtualCamps[i].mails[j]);
              emailjs.send('service_7pkwiug', 'template_fru8jpq', params).then(function(res) {
              console.log('mail sent!');
              }); 
            } 
          }
        }
      }
      return 0;
    }

    render() {
        return(
            
        <div id="content" className="mt-3" style={{backgroundColor: color}}>

        <div className="card mb-4" style={{backgroundColor: color}}>

          <div className="card-body" style={{backgroundColor: color}}>
          <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                this.addCampaign(this.state.campName, this.state.campGoal, this.state.campDescription, this.state.campUser);
              }}>
              <div class="form-group">
                <h4 className="float-left bg-info "><b>CREATE CAMPAIGN</b></h4>
              </div>
              <span className="float-right"> Campaign name: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.value = input }}
                  value={this.state.campName}
                  onChange={this.handleName}
                  className="form-control form-control-lg"
                  placeholder="Enter campaign name"
                  required />
              </div>
              <span className="float-right text-muted"> Campaign goal: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.address = input.toString()}}
                  value={this.state.campGoal}
                  onChange={this.handleGoal}
                  className="form-control form-control-lg"
                  placeholder="Enter campaign goal in ETH"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp; ETH
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
                  placeholder="Enter campaign description"
                  required />
              </div>
              <button type="submit" className="btn btn-info btn-block btn-lg">SUBMIT!</button>
            </form>
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                this.withdraw(this.state.ID, this.state.recepient)
              }}>
              <div class="form-group">
                <h4 className="float-left bg-info "><b>WITHDRAW ETH</b></h4>
              </div>
              <span className="float-right text-muted"> Campaign ID: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.value = input }}
                  value={this.state.ID}
                  onChange={this.handleID}
                  className="form-control form-control-lg"
                  placeholder="Enter campaign ID (number)"
                  required />
              </div>
              <span className="float-right text-muted"> Recepient wallet address: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.address = input.toString()}}
                  value={this.state.recepient}
                  onChange={this.handleRecepient}
                  className="form-control form-control-lg"
                  placeholder="Enter recepient wallet addres (i.e. 0xAb17w...)"
                  required />
              </div>
              <button type="submit" className="btn btn-info btn-block btn-lg">WITHDRAW!</button>
            </form>
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                this.addMember(this.state.memberAddress)
              }}>
              <div class="form-group">
                <h4 className="float-left bg-info "><b>ADD ORGANISATION MEMBER</b></h4>
              </div>
              <span className="float-right text-muted"> New member wallet address: </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  //ref={(input) => { this.input.value = input }}
                  value={this.state.memberAddress}
                  onChange={this.handleMemberAddress}
                  className="form-control form-control-lg"
                  placeholder="Enter new member wallet address (i.e. 0xAb17w...)"
                  required />
              </div>
              <button type="submit" className="btn btn-info btn-block btn-lg">ADD MEMBER</button>
            </form>
            </div>
        </div>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
<script type="text/javascript">
(function() {
emailjs.init("user_gzsTSWT9xHNSKVd7W1EDK")})();
</script>
      </div>
    );
    }
}
export default Login;