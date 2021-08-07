import React, { Component, useState } from 'react'
import {Collapse, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import emailjs from 'emailjs-com'
import CampaignRow from "./campaignRow"
import{ init } from 'emailjs-com';
import Campaign from "./abis/Campaign.json"
import Organisation from "./abis/Organisation.json"
import SwapExamples from "./abis/SwapExamples.json"
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
init("user_ZYwxMAlLHOgUNKO4wSLBm");
const ethers = require('ethers'); 
const color="#F9F3F3";



class Home extends Component{

    constructor(props) {
        super(props);  
        const { exit } = require('process');
        this.campAbi = Campaign.abi;
        this.orgAbi = Organisation.abi;
        this.swapAbi = SwapExamples.abi;
        this.genericERC20Abi = [
          {
              "constant": true,
              "inputs": [],
              "name": "name",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_spender",
                      "type": "address"
                  },
                  {
                      "name": "_value",
                      "type": "uint256"
                  }
              ],
              "name": "approve",
              "outputs": [
                  {
                      "name": "",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "totalSupply",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_from",
                      "type": "address"
                  },
                  {
                      "name": "_to",
                      "type": "address"
                  },
                  {
                      "name": "_value",
                      "type": "uint256"
                  }
              ],
              "name": "transferFrom",
              "outputs": [
                  {
                      "name": "",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "decimals",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint8"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "_owner",
                      "type": "address"
                  }
              ],
              "name": "balanceOf",
              "outputs": [
                  {
                      "name": "balance",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "symbol",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_to",
                      "type": "address"
                  },
                  {
                      "name": "_value",
                      "type": "uint256"
                  }
              ],
              "name": "transfer",
              "outputs": [
                  {
                      "name": "",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "_owner",
                      "type": "address"
                  },
                  {
                      "name": "_spender",
                      "type": "address"
                  }
              ],
              "name": "allowance",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "payable": true,
              "stateMutability": "payable",
              "type": "fallback"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": true,
                      "name": "owner",
                      "type": "address"
                  },
                  {
                      "indexed": true,
                      "name": "spender",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "value",
                      "type": "uint256"
                  }
              ],
              "name": "Approval",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": true,
                      "name": "from",
                      "type": "address"
                  },
                  {
                      "indexed": true,
                      "name": "to",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "value",
                      "type": "uint256"
                  }
              ],
              "name": "Transfer",
              "type": "event"
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
          loading: true,
          open: false,
          setOpen: false,
          activeCamps : {},
          finishedCamps: {},
          inactiveCamps: {},
          token: ""
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
        this.handleToken = this.handleToken.bind(this);
        this.provider = new ethers.providers.InfuraProvider("ropsten", "52a080cad405419aa4318047bde7087f"); 
        //const url = "http://localhost:7545"
        //this.provider = new ethers.providers.JsonRpcProvider(url);
        this.finishedCampaigns = [];
        this.virtualCamps={};
        this.subscribed = new Set();
        this.tokenListURL = ["https://tokens.uniswap.org/","https://testnet.tokenlist.eth.link/"];
        this.tokenListJSON = [];
        this.tokensDict = {
          "DAI": "0xad6d458402f60fd3bd25163575031acdce07538d",
          "WETH": "0xc778417e063141139fce010982780140aa0cd5ab",
          "USDT": "0x110a13fc3efe6a245b50102d2d79b3e76125ae83"};
        this.contractOrg = new ethers.Contract("0x910775E150224bEe9ADDd4A519aCAB85eE22aa64", this.orgAbi, this.provider);
        this.swapperAddress = "0x6cA17f42B071311d9564cA1683cbe0cf3a15a01B";
        this.loadTokenList();
      }

      async loadTokenList() {
        var timer = null;
        await this.tokenListURL.forEach(url => {
          fetch(url).then(response => response.json())
          .then((jsonData) => {
            // jsonData is parsed json object received from url
            console.log(jsonData)
            this.tokenListJSON.push(jsonData);
          })
          .catch((error) => {
            // handle your errors here
            console.error(error)
          });
        });
        this.tokenNames=[];
        var cnt = this.tokenListURL.length;
        console.log(cnt);

        //const timer = setTimeout(() => {
          for(var i=0;i<cnt;i++){
            this.tokenListJSON[i].forEach(element => {
              console.log(element);
              if(element.chainId == '3'){
                console.log("da");
                this.tokensDict[element.symbol] = element.address;
              }
            });
          }
        //}, 3500);
        //clearTimeout(timer);
        console.log(this.tokenListJSON);

      }
    
      async loadBlockchainData() {
        var activeCamps = {};
        var inactiveCamps = {};
        var finishedCamps = {};
        var counter = await this.contractOrg.campaignCounter();
        for (let i = 1; i <= counter; i++) {
          var Campaign = {
            name: "",
            id: "",
            currFund: "",
            goal: "",
            description: "",
            mails: [],
            endTimeStamp: 0
          }
          var addr = await this.contractOrg.campaigns(i);
          var camp = new ethers.Contract(addr, this.campAbi, this.provider);
          var name = await camp.name();
          var id = await camp.id();
          var currFund = await camp.currFund();
          var goal = await camp.goal();
          var description = await camp.description();
          var finished = await camp.finished();
          var block = await this.provider.getBlock("latest");
          var currStamp = block.timestamp;
          var endStamp = await camp.endTimeStamp();
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
          Campaign.endTimeStamp = endStamp;
          if (currStamp > endStamp){
            inactiveCamps[Campaign.id] = Campaign;
          }else if(finished == true){
            finishedCamps[Campaign.id] = Campaign;
          }else{
            activeCamps[Campaign.id] = Campaign;
            if (!this.subscribed.has(id._hex)) {
              camp.on('GoalReached', (totalFund, goal, campaignId, name, mails) => this.sendMail(campaignId, totalFund, goal, name, mails))
              console.log(camp)
              console.log(this.subscribed)
              this.subscribed.add(id._hex)
            }
          }

          this.setState({activeCamps : activeCamps, finishedCamps: finishedCamps, inactiveCamps: inactiveCamps, loading: false});


        }
        

        
      }

      async swap(campaignId, amount, email, token){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        var campAddress = await this.contractOrg.campaigns(parseInt(campaignId, 10));
        var contract = new ethers.Contract(campAddress, this.campAbi, this.provider);
        contract = contract.connect(signer);
        console.log(amount);
        console.log(token);
        var tokenContract = new ethers.Contract(token, this.genericERC20Abi, this.provider);
        tokenContract = tokenContract.connect(signer);
        var decimals = await tokenContract.decimals();
        amount = ethers.utils.parseUnits(amount, decimals);
        var parameters = {
          gasLimit: 0x7a120
        };
        var approval = await tokenContract.approve(this.swapperAddress, amount, parameters);
        console.log(approval);
        var swapContract = new ethers.Contract(this.swapperAddress, this.swapAbi, this.provider);
        swapContract = swapContract.connect(signer);
        
        var outAmount = await swapContract.swapExactInputSingle(amount, token, campAddress, parameters);
        console.log(outAmount);
      }

      async donate(campaignId, amount, email, currency){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(campaignId)
        if (currency == "ETH") {
        var campAddress = await this.contractOrg.campaigns(parseInt(campaignId, 10));
        var contract = new ethers.Contract(campAddress, this.campAbi, this.provider);
        contract = contract.connect(signer);
        if (this.state.activeCamps[campaignId].currFund + ethers.utils.parseEther(amount) > this.state.activeCamps[campaignId].goal){
          return { result: false,
                    message: "Amount too large - hard cap limitation, try a lower amount",
                    value: [this.state.activeCamps[campaignId].goal.toNumber()-this.state.activeCamps[campaignId].currFund.toNumber()]}
        }

        var parameters = {
          value: ethers.utils.parseEther(amount),
          gasLimit: 0x7a120
        }
        var tx = await contract.donate(email, parameters);
      } else {
        var token = this.tokensDict[currency];
        console.log(token);
        this.swap(campaignId, amount, email, token);
      }
      this.setState({
        campId: "",
        address: "",
        value: "",
        email: ""
      });
      return { result: true,
        message: "Donation successful",
        value: 0}
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
      handleToken(event) {  this.setState({token: event.target.value}); }
      handleMemberAddress(event) {    this.setState({memberAddress: event.target.value});  }
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

    render(){
        const campList = () => {
            if (!this.state.loading){
            let content = [];
            var camps = this.state.activeCamps;
            for (var [key,value] of Object.entries(camps)) {
              content.push(<CampaignRow
                name={value.name}
                id={value.id}
                currFund={value.currFund}
                goal={value.goal}
                description={value.description}
                home={this}/>);
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

