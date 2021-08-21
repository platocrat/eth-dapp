import { init } from 'emailjs-com';
import CampaignJson from './_mocks_/abis/Campaign.json';
import Organisation from './_mocks_/abis/Organisation.json';
import SwapExamples from './_mocks_/abis/SwapExamples.json';
import emailjs from 'emailjs-com';
import pinataSDK from '@pinata/sdk';

const axios = require('axios');
init('user_ZYwxMAlLHOgUNKO4wSLBm');
const ethers = require('ethers');
const campAbi = CampaignJson.abi;
const orgAbi = Organisation.abi;

const campaigns = async () => {
  var activeCamps = {};
  var inactiveCamps = {};
  var finishedCamps = {};
  const provider = new ethers.providers.InfuraProvider(
    'ropsten',
    '6d31cb4cff10447d83830dd5eaee29e2'
  );
  var subscribed = new Set();
  const contractOrg = new ethers.Contract(
    '0x583F1A72C30AC3c1134b29aBfc826F59e9e97Cb6',
    orgAbi,
    provider
  );

  var counter = await contractOrg.campaignCounter();
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
    var addr = await contractOrg.campaigns(i);
    var camp = new ethers.Contract(addr, campAbi, provider);
    var name = await camp.name();
    var id = await camp.id();
    var currFund = await camp.currFund();
    var goal = await camp.goal();
    var description = await camp.description();
    var finished = await camp.finished();
    var block = await provider.getBlock('latest');
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
      if (!subscribed.has(id._hex)) {
        camp.on('GoalReached', (totalFund, goal, campaignId, name, mails) =>
          //this.sendMail(campaignId, totalFund, goal, name, mails)
          console.log('sent')
        );
        camp.on('Donated', (amount, campaignId, name, mail) => {
          //this.donatedMail(amount, campaignId, name, mail);
          //this.setState({ loading: true, success: true });
          const timer = setTimeout(() => {
            console.log('This will run after 3 seconds!');
          }, 3000);
        });
        subscribed.add(id._hex);
      }
    }
  }
  return { activeCamps: activeCamps, inactiveCamps: inactiveCamps, finishedCamps: finishedCamps };
};
const tokenList = async () => {
  var tokenListURL = ['https://tokens.uniswap.org/', 'https://testnet.tokenlist.eth.link/'];
  var tokenListJSON = [];
  var tokensDict = {};
  await tokenListURL.forEach((url) => {
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log(jsonData);
        tokenListJSON.push(jsonData);
        jsonData.tokens.forEach((element) => {
          if (element.chainId == '3') {
            tokensDict[element.symbol] = element.address;
          }
        });
      })
      .catch((error) => {
        // handle your errors here
        console.error(error);
      });
  });
  return tokensDict;
};
const swap = async (campaignId, amount, email, token, uri) => {
  const genericERC20Abi = [
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
  const swapperAddress = '0xaeda743de9aeaEf60604cDd9077B664E10a0B844';
  const swapAbi = SwapExamples.abi;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  var campAddress = await this.contractOrg.campaigns(parseInt(campaignId, 10));
  var contract = new ethers.Contract(campAddress, campAbi, provider);
  contract = contract.connect(signer);
  console.log(amount);
  console.log(token);
  var tokenContract = new ethers.Contract(token, genericERC20Abi, provider);
  tokenContract = tokenContract.connect(signer);
  var decimals = await tokenContract.decimals();
  amount = ethers.utils.parseUnits(amount, decimals);
  var parameters = {
    gasLimit: 0x7a120
  };
  var approval = await tokenContract.approve(swapperAddress, amount, parameters);
  console.log(approval);
  var swapContract = new ethers.Contract(swapperAddress, swapAbi, provider);
  swapContract = swapContract.connect(signer);
  var outAmount = await swapContract.swapExactInputSingle(
    amount,
    token,
    campAddress,
    uri,
    email,
    parameters
  );
  console.log(outAmount);
};

const donate = async (campaignId, amount, email, currency) => {
  const pinataApiKey = '78422e3a7f7f490ac776';
  const pinataSecretApiKey = '5d65bc1b6d2d865088d1974323f65c32061eb91c7c5d1b4895c4659ba933dfcc';
  const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);
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
  var camp = await this.state.activeCamps[campaignId];
  var block = await this.provider.getBlock('latest');
  var stamp = block.timestamp;
  const body = {
    name: camp.name,
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
      console.log(campaignId);
      console.log(this.state.activeCamps);
      console.log(result);
      var uri = result.IpfsHash;
      console.log(uri);
      const contractOrg = new ethers.Contract(
        '0x583F1A72C30AC3c1134b29aBfc826F59e9e97Cb6',
        orgAbi,
        provider
      );
      if (currency == 'ETH') {
        var campAddress = await contractOrg.campaigns(parseInt(campaignId, 10));
        var contract = new ethers.Contract(campAddress, campAbi, provider);
        contract = contract.connect(signer);
        if (
          campaigns.activeCamps[campaignId].currFund + ethers.utils.parseEther(amount) >
          campaigns.activeCamps[campaignId].goal
        ) {
          return {
            result: false,
            message: 'Amount too large - hard cap limitation, try a lower amount',
            value: [
              campaigns.activeCamps[campaignId].goal.toNumber() -
                campaigns.activeCamps[campaignId].currFund.toNumber()
            ]
          };
        }

        var parameters = {
          value: ethers.utils.parseEther(amount),
          gasLimit: 0x7a120
        };
        var tx = await contract.donate(email, uri, parameters);
      } else {
        var token = this.tokensDict[currency];
        console.log(token);
        swap(campaignId, amount, email, token, uri);
      }
      return { result: true, message: 'Donation successful', value: 0 };
    })
    .catch((err) => {
      //handle error here
      console.log(err);
      return 0;
    });
};

const sendMail = async (campaignId, curr_fund, goal, name, mails) => {
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
};

const donatedMail = async (amount, campaignId, name, mail) => {
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
};

export default { campaigns, donate, donatedMail, swap, sendMail, tokenList };
