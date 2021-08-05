pragma solidity >=0.8.0 <0.9.0;
pragma abicoder v2;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./4_SimpleNFT.sol";

// SPDX-License-Identifier: MIT

contract Campaign {
    
    using SafeMath for uint;
    using SafeERC20 for IERC20;
    
    uint public id;
    string public name;
    uint public currFund;
    uint public goal;
    address payable public owner;
    bool public finished = false;
    string public description;
    string[] public mails;
    uint public mailCount;
    uint public endTimeStamp;
    SimpleNFT private nfts;
    
    constructor(uint _id, string memory _name, uint _goal, string memory _description, uint _endTimeStamp, address payable _beneficiary){
        id = _id;
        name = _name;
        currFund = 0;
        goal = _goal;
        description = _description;
        owner = _beneficiary;
        endTimeStamp = _endTimeStamp;
        nfts = new SimpleNFT();
    }
    event GoalReached(uint totalFund, uint goal, uint campaignId, string name, string[] mails);
    event Donated(uint amount, uint campaignId, string name, string mail);
    
    function donate(string memory _mail) public payable returns(bool sufficient) {
        require(tx.origin.balance >= msg.value, "Campaign::donate: Insuficient funds");
        require(endTimeStamp > block.timestamp, "Campaign::donate: This campaign has already finished");
        require(currFund + msg.value <= goal, "Campaign::donate: Hard cap reached");
        currFund += msg.value;
        mails.push(_mail);
        mailCount++;
        
        if (currFund == goal) {
            emit GoalReached(currFund, goal, id, name, mails);
            finished = true;
            withdraw();
        }
        emit Donated(msg.value, id, name, _mail);
        nfts.createSimpleNFT("https://ipfs.io/ipfs/Qmeuw3QFHBmVRx3K1owGreKx1PvCtrrnNDQi6vNw8oaQYT");
        return true;
        
        
    }
    
    function expiredWithdraw() public {
        require(endTimeStamp < block.timestamp, "Campaign::expiredWithdraw: This campaign is still active");
        require(msg.sender == owner, "campaign::expiredWithdraw: Only the beneficiary can withdraw the funds");
        owner.transfer(address(this).balance);
    }

    function withdraw() private returns(bool sufficient) {
        owner.transfer(address(this).balance);
        return true;
        }
    
}