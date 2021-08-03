import React, { Component, useState } from 'react'
import {Collapse, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import emailjs from 'emailjs-com'
import CampaignRow from "./campaignRow"
import{ init } from 'emailjs-com';
import Campaign from "./abis/Campaign.json"
import Organisation from "./abis/Organisation.json"
import ORGANISATION_CONTRACT_ADDRESS from "./.env"
init("user_ZYwxMAlLHOgUNKO4wSLBm");
const ethers = require('ethers'); 
const color="#F9F3F3";


class Home extends Component{

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
          loading: true,
          open: false,
          setOpen: false
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
        //this.provider = new ethers.providers.InfuraProvider("ropsten", "0ea19bbf4c4d49518a0966666ff234f3"); 
        const url = "http://localhost:7545"
        this.provider = new ethers.providers.JsonRpcProvider(url);
        this.finishedCampaigns = [];
        this.virtualCamps=[];
        this.subscribed = new Set();

        
        this.contractOrg = new ethers.Contract("0x78Dbe89e65545cA2D70979c5D5c15ce275121807", this.orgAbi, this.provider);
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
        <div class="row">
          <div class="col-md-12">
            <div class="carousel slide" id="carousel-856309">
              <ol class="carousel-indicators">
                <li data-slide-to="0" data-target="#carousel-856309" class="active">
                </li>
                <li data-slide-to="1" data-target="#carousel-856309">
                </li>
                <li data-slide-to="2" data-target="#carousel-856309">
                </li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img class="d-block w-100" alt="Carousel Bootstrap First" src="https://www.layoutit.com/img/sports-q-c-1600-500-1.jpg" />
                  <div class="carousel-caption">
                    <h4>
                      First Thumbnail label
                    </h4>
                    <p>
                      Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    </p>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" alt="Carousel Bootstrap Second" src="https://www.layoutit.com/img/sports-q-c-1600-500-2.jpg" />
                  <div class="carousel-caption">
                    <h4>
                      Second Thumbnail label
                    </h4>
                    <p>
                      Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    </p>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" alt="Carousel Bootstrap Third" src="https://www.layoutit.com/img/sports-q-c-1600-500-3.jpg" />
                  <div class="carousel-caption">
                    <h4>
                      Third Thumbnail label
                    </h4>
                    <p>
                      Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    </p>
                  </div>
                </div>
              </div> <a class="carousel-control-prev" href="#carousel-856309" data-slide="prev"><span class="carousel-control-prev-icon"></span> <span class="sr-only">Previous</span></a> <a class="carousel-control-next" href="#carousel-856309" data-slide="next"><span class="carousel-control-next-icon"></span> <span class="sr-only">Next</span></a>
            </div>
          </div>
        
      <h3 className="float-left"><b> CAMPAIGNS </b></h3>
      <div class="row">
        {campList()}
      </div>
      <div>
      <Button
      onClick={() => {this.state.setOpen = !this.state.open}}
      aria-controls="example-collapse-text"
      aria-expanded={this.state.open}
    >
      click
    </Button>
    <Collapse in={this.state.open}>
      <div id="example-collapse-text">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </div>
    </Collapse>
    </div>
      </div>

        
        )
    }
}

/*

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

*/

export default Home;

