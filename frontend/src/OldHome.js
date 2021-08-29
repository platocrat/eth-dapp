import React, { Component, useState } from 'react';
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
import Campaign from './abis/Campaign.json';
import Organisation from './abis/Organisation.json';
import SwapExamples from './abis/SwapExamples.json';
const FormData = require('form-data');
const axios = require('axios');
init('user_ZYwxMAlLHOgUNKO4wSLBm');
const ethers = require('ethers');
const color = '#d2d2d2';
const pinataSDK = require('@pinata/sdk');
const web3 = require('web3');
require('dotenv').config();

class Home extends Component {
  constructor(props) {
    super(props);
    require('dotenv').config();
    this.campAbi = Campaign.abi;
    this.orgAbi = Organisation.abi;
    this.swapAbi = SwapExamples.abi;
    this.genericERC20Abi = [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [
          {
            name: '',
            type: 'string'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          {
            name: '_spender',
            type: 'address'
          },
          {
            name: '_value',
            type: 'uint256'
          }
        ],
        name: 'approve',
        outputs: [
          {
            name: '',
            type: 'bool'
          }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            name: '',
            type: 'uint256'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          {
            name: '_from',
            type: 'address'
          },
          {
            name: '_to',
            type: 'address'
          },
          {
            name: '_value',
            type: 'uint256'
          }
        ],
        name: 'transferFrom',
        outputs: [
          {
            name: '',
            type: 'bool'
          }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            name: '',
            type: 'uint8'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address'
          }
        ],
        name: 'balanceOf',
        outputs: [
          {
            name: 'balance',
            type: 'uint256'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            name: '',
            type: 'string'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          {
            name: '_to',
            type: 'address'
          },
          {
            name: '_value',
            type: 'uint256'
          }
        ],
        name: 'transfer',
        outputs: [
          {
            name: '',
            type: 'bool'
          }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address'
          },
          {
            name: '_spender',
            type: 'address'
          }
        ],
        name: 'allowance',
        outputs: [
          {
            name: '',
            type: 'uint256'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        payable: true,
        stateMutability: 'payable',
        type: 'fallback'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'owner',
            type: 'address'
          },
          {
            indexed: true,
            name: 'spender',
            type: 'address'
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256'
          }
        ],
        name: 'Approval',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'from',
            type: 'address'
          },
          {
            indexed: true,
            name: 'to',
            type: 'address'
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256'
          }
        ],
        name: 'Transfer',
        type: 'event'
      }
    ];
    this.state = {
      campId: '',
      address: '',
      value: '',
      campName: '',
      campGoal: '',
      campUser: '',
      campDescription: '',
      ID: '',
      recepient: '',
      memberAddress: '',
      email: '',
      loading: true,
      open: false,
      setOpen: false,
      activeCamps: {},
      finishedCamps: {},
      inactiveCamps: {},
      token: '',
      success: false,
      campLoadingFinished: false
    };

    //this.state = {value: ''};
    this.handleLoadingChange = this.handleLoadingChange.bind(this);
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
    // this.provider = new ethers.providers.InfuraProvider(
    //   'optimistic-kovan',
    //   '0ea19bbf4c4d49518a0966666ff234f3'
    // );
    const url = 'https://kovan.optimism.io';
    this.provider = new ethers.providers.JsonRpcProvider(url);
    this.finishedCampaigns = [];
    this.virtualCamps = {};
    this.subscribed = new Set();
    this.tokenListURL = [
      'https://tokens.uniswap.org/',
      'https://testnet.tokenlist.eth.link/',
      'https://static.optimism.io/optimism.tokenlist.json'
    ];
    this.tokenListJSON = [];
    this.tokensDict = {};
    this.contractOrg = new ethers.Contract(
      process.env.REACT_APP_ORGANISATION_CONTRACT_ADDRESS,
      this.orgAbi,
      this.provider
    );
    this.swapperAddress = process.env.REACT_APP_SWAPPER_CONTRACT_ADDRESS;
    this.loadTokenList();
    this.pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
    this.pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_KEY;
    this.imgURI =
      'https://ipfs.io/ipfs/QmRQX6MEwTcumgo2xhVagQ5mj7AxENB4AK6axPMM28aLz1?filename=Lisa.jpeg';
    this.items = [
      {
        src: 'http://localhost:8000/1.png',
        altText: 'Slide 1',
        caption: 'Psychosocial support for children during COVID-19',
        header: '',
        key: '1'
      },
      {
        src: 'http://localhost:8000/2.png',
        altText: 'Slide 2',
        caption:
          'Helping children return to normalcy: psychosocial support for children in the Marawi crisis',
        header: '',
        key: '2'
      },
      {
        src: 'http://localhost:8000/3.png',
        altText: 'Slide 3',
        caption: 'Donate to Help Children in Sierra Leone',
        header: '',
        key: '3'
      }
    ];
  }
  async loadTokenList() {
    require('dotenv').config();
    var chainId = process.env.REACT_APP_CHAIN_ID;
    await this.tokenListURL.forEach((url) => {
      fetch(url)
        .then((response) => response.json())
        .then((jsonData) => {
          // jsonData is parsed json object received from url
          this.tokenListJSON.push(jsonData);
          jsonData.tokens.forEach((element) => {
            if (element.chainId == chainId) {
              this.tokensDict[element.symbol] = element.address;
            }
          });
        })
        .catch((error) => {
          // handle your errors here
          console.error(error);
        });
    });
  }
  uploadNftFile(amount, campName, stamp, currency) {
    const pinata = pinataSDK(this.pinataApiKey, this.pinataSecretApiKey);
    pinata
      .testAuthentication()
      .then((result) => {
        //handle successful authentication here
      })
      .catch((err) => {
        //handle error here
        console.log(err);
      });
    const body = {
      name: campName,
      amount: amount,
      currency: currency,
      timestamp: stamp,
      img_uri: this.imgURI
    };
    const options = {
      pinataMetadata: {
        name: 'ELF token',
        keyvalues: {
          customKey: 'customValue',
          customKey2: 'customValue2'
        }
      },
      pinataOptions: {
        cidVersion: 0
      }
    };
    pinata
      .pinJSONToIPFS(body, options)
      .then((result) => {
        //handle results here
        return result;
      })
      .catch((err) => {
        //handle error here
        console.log(err);
        return 0;
      });
  }
  async loadBlockchainData() {
    var activeCamps = {};
    var inactiveCamps = {};
    var finishedCamps = {};
    var counter = await this.contractOrg.campaignCounter();
    for (let i = 1; i <= counter; i++) {
      var Campaign = {
        name: '',
        id: '',
        currFund: '',
        goal: '',
        description: '',
        mails: [],
        endTimeStamp: 0
      };
      var addr = await this.contractOrg.campaigns(i);
      var camp = new ethers.Contract(addr, this.campAbi, this.provider);
      var name = await camp.name();
      var id = await camp.id();
      var currFund = await this.provider.getBalance(addr);
      var goal = await camp.goal();
      var description = await camp.description();
      var finished = await camp.finished();
      var block = await this.provider.getBlock('latest');
      var currStamp = block.timestamp;
      var endStamp = await camp.endTimeStamp();
      const date = Math.floor(new Date(endStamp * 1000));
      const date2 = new Date(endStamp * 1000);
      const currDate = Math.floor(new Date());
      var daysLeft = Math.ceil(new Date(date - currDate) / (24 * 60 * 60 * 1000));
      endStamp = date2.toLocaleDateString('en-GB');
      var mails = [];
      var counterMail = await camp.mailCount();
      for (var j = 0; j < counterMail; j++) {
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
      Campaign.daysLeft = daysLeft;
      if (currStamp > endStamp) {
        inactiveCamps[Campaign.id] = Campaign;
      } else if (finished == true) {
        finishedCamps[Campaign.id] = Campaign;
      } else {
        activeCamps[Campaign.id] = Campaign;
        if (!this.subscribed.has(id._hex)) {
          camp.on('GoalReached', (totalFund, goal, campaignId, name, mails) =>
            this.sendMail(campaignId, totalFund, goal, name, mails)
          );
          camp.on('Donated', (amount, campaignId, name, mail) => {
            this.donatedMail(amount, campaignId, name, mail);
            this.setState({ loading: true, success: true });
            const timer = setTimeout(() => {
              console.log('This will run after 3 seconds!');
              this.setState({ success: false });
            }, 3000);
          });
          this.subscribed.add(id._hex);
        }
      }
    }
    console.log('loaded');
    // this.setState({
    //   activeCamps: activeCamps,
    //   finishedCamps: finishedCamps,
    //   inactiveCamps: inactiveCamps,
    //   loading: false
    // });
    return { activeCamps: activeCamps, finishedCamps: finishedCamps, inactiveCamps: inactiveCamps };
  }

  async swap(campaignId, amount, email, token, uri) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(provider, signer);
    var campAddress = await this.contractOrg.campaigns(parseInt(campaignId, 10));
    console.log(campAddress);
    var contract = new ethers.Contract(campAddress, this.campAbi, provider);
    contract = contract.connect(signer);
    console.log(amount);
    console.log(token, this.genericERC20Abi, provider);
    var tokenContract = new ethers.Contract(token, this.genericERC20Abi, provider);
    console.log('1');
    tokenContract = tokenContract.connect(signer);
    var decimals = await tokenContract.decimals();
    amount = ethers.utils.parseUnits(amount, decimals);
    console.log(this.swapperAddress);
    var gasPrice = await provider.getGasPrice();
    var gasEstimate = await tokenContract.estimateGas.approve(this.swapperAddress, amount);
    var parameters = {
      gasLimit: gasEstimate,
      gasPrice: gasPrice
    };
    var approval = await tokenContract.approve(this.swapperAddress, amount, parameters);
    console.log(approval);
    var swapContract = new ethers.Contract(this.swapperAddress, this.swapAbi, provider);
    swapContract = swapContract.connect(signer);
    gasPrice = await provider.getGasPrice();
    var block = await provider.getBlock('latest');
    console.log(block.gasLimit);
    gasEstimate = await swapContract.estimateGas.swapExactInputSingle(
      amount,
      token,
      campAddress,
      uri,
      email
    );
    parameters = {
      gasLimit: gasEstimate,
      gasPrice: gasPrice
    };
    console.log(parameters);
    var outAmount = await swapContract.swapExactInputSingle(
      amount,
      token,
      campAddress,
      uri,
      email,
      parameters
    );
    console.log(outAmount);
  }

  async donate(campaignId, amount, email, currency) {
    const pinata = pinataSDK(this.pinataApiKey, this.pinataSecretApiKey);
    pinata
      .testAuthentication()
      .then((result) => {
        //handle successful authentication here
        console.log(result);
      })
      .catch((err) => {
        //handle error here
        console.log(err);
      });
    var campAddress = await this.contractOrg.campaigns(parseInt(campaignId, 10));
    var camp = new ethers.Contract(campAddress, this.campAbi, this.provider);
    var name = await camp.name();
    var block = await this.provider.getBlock('latest');
    var stamp = block.timestamp;
    const body = {
      name: name,
      amount: amount,
      currency: currency,
      timestamp: stamp,
      img_uri: this.imgURI
    };
    const options = {
      pinataMetadata: {
        name: 'ELF token',
        keyvalues: {
          customKey: 'customValue',
          customKey2: 'customValue2'
        }
      },
      pinataOptions: {
        cidVersion: 0
      }
    };
    pinata
      .pinJSONToIPFS(body, options)
      .then(async (result) => {
        //handle results here
        console.log(result);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        var address = await signer.getAddress();
        console.log(address);
        var uri = result.IpfsHash;
        if (currency == 'ETH') {
          var campAddress = await this.contractOrg.campaigns(parseInt(campaignId, 10));
          var contract = new ethers.Contract(campAddress, this.campAbi, this.provider);
          contract = contract.connect(signer);
          //   if (
          //     this.state.activeCamps[campaignId].currFund + ethers.utils.parseEther(amount) >
          //     this.state.activeCamps[campaignId].goal
          //   ) {
          //     // return {
          //     //   result: false,
          //     //   message: 'Amount too large - hard cap limitation, try a lower amount',
          //     //   value: [
          //     //     this.state.activeCamps[campaignId].goal.toNumber() -
          //     //       this.state.activeCamps[campaignId].currFund.toNumber()
          //     //   ]
          //     // };
          //   }
          const gasPrice = await provider.getGasPrice();
          const gasEstimate = await contract.estimateGas.donate(email, uri);
          var parameters = {
            value: ethers.utils.parseEther(amount),
            gasLimit: gasEstimate,
            gasPrice: gasPrice
          };
          console.log(parameters);
          var tx = await contract.donate(email, uri, parameters);
        } else {
          var token = currency;
          this.swap(campaignId, amount, email, token, uri);
        }
        this.setState({
          campId: '',
          address: '',
          value: '',
          email: ''
        });
        return { result: true, message: 'Donation successful', value: 0 };
      })
      .catch((err) => {
        //handle error here
        console.log(err);
        return 0;
      });
  }

  async sendMail(campaignId, curr_fund, goal, name, mails) {
    var sent = [];
    campaignId = campaignId.toString();
    console.log('proslo');
    for (var i = 0; i < mails.length; i++) {
      var params = {
        to_email: mails[i],
        campaign_name: name,
        goal: ethers.utils.formatEther(goal),
        curr_fund: ethers.utils.formatEther(curr_fund)
      };
      if (!sent.includes(mails[i])) {
        sent.push(mails[i]);
        emailjs.send('service_mr0tweq', 'template_p2vca7b', params).then(function (res) {
          console.log('mail sent!');
        });
      }
    }
    return 0;
  }

  async donatedMail(amount, campaignId, name, mail) {
    var sent = [];
    campaignId = campaignId.toString();
    console.log('proslo');
    var params = {
      to_email: mail,
      campaign_name: name,
      amount: ethers.utils.formatEther(amount)
    };
    emailjs.send('service_mr0tweq', 'template_cscp88f', params).then(function (res) {
      console.log('mail sent!');
    });
    return 0;
  }
  //   async addCampaign(name, goal, description, date, time) {
  //     var datetime = date + 'T' + time;
  //     var stamp = new Date(datetime);
  //     stamp = Math.floor(Date.parse(datetime) / 1000);
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const address = await signer.getAddress();
  //     const orgContract = this.contractOrg.connect(signer);
  //     console.log(goal);
  //     goal = ethers.utils.parseEther('1.0');
  //     console.log(goal);
  //     var parameters = { gasLimit: 0x7a1200 };
  //     console.log(goal._hex[0]);
  //     var tx = await orgContract.addCampaign(name, tokens, description, stamp, address);
  //   }
  async addCampaign(name, goal, description, date, time) {
    require('dotenv').config();
    console.log(date);
    console.log(time);
    var datetime = date.setHours(time.getHours(), time.getMinutes(), 0, 0);
    console.log(datetime);
    var stamp = Math.floor(datetime / 1000);
    const orgAbi = Organisation.abi;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    var address = await signer.getAddress();
    const orgAddress = process.env.REACT_APP_ORGANISATION_CONTRACT_ADDRESS;
    console.log(orgAddress);
    const contractOrg = new ethers.Contract(orgAddress, orgAbi, provider);
    const orgContract = contractOrg.connect(signer);
    goal = ethers.utils.parseEther(goal);
    const gasPrice = await provider.getGasPrice();
    console.log(stamp);
    const gasEstimate = await orgContract.estimateGas.addCampaign(
      name,
      goal,
      description,
      stamp,
      address
    );
    console.log(gasPrice);
    console.log(gasEstimate, gasPrice);
    var parameters = {
      gasLimit: gasEstimate,
      gasPrice: gasPrice
    };
    var tx = await orgContract.addCampaign(name, goal, description, stamp, address, parameters);

    var receipt = await tx.wait();
    window.location.replace('http://localhost:3000');
  }
  handleLoadingChange(event) {
    this.setState({ loading: true });
    event.preventDefault();
  }
  handleCampId(event) {
    this.setState({ campId: event.target.value });
  }
  handleAddress(event) {
    this.setState({ address: event.target.value });
  }
  handleValue(event) {
    this.setState({ value: event.target.value });
  }
  handleName(event) {
    this.setState({ campName: event.target.value });
  }
  handleGoal(event) {
    this.setState({ campGoal: event.target.value });
  }
  handleUser(event) {
    this.setState({ campUser: event.target.value });
  }
  handleDescription(event) {
    this.setState({ campDescription: event.target.value });
  }
  handleID(event) {
    this.setState({ ID: event.target.value });
  }
  handleRecepient(event) {
    this.setState({ recepient: event.target.value });
  }
  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleToken(event) {
    this.setState({ token: event.target.value });
  }
  handleMemberAddress(event) {
    this.setState({ memberAddress: event.target.value });
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
}
export default Home;
