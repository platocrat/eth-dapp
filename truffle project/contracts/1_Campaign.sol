pragma solidity 0.7.6;
pragma abicoder v2;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
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
    mapping(address => bool) donators;
    SimpleNFT public nfts;
    
    constructor(uint _id, string memory _name, uint _goal, string memory _description, uint _endTimeStamp, address payable _beneficiary, address _nft){
        id = _id;
        name = _name;
        currFund = 0;
        goal = _goal;
        description = _description;
        owner = _beneficiary;
        endTimeStamp = _endTimeStamp;
        nfts = SimpleNFT(_nft);
    }
    event GoalReached(uint totalFund, uint goal, uint campaignId, string name, string[] mails);
    event Donated(uint amount, uint campaignId, string name, string mail);
    
    function donate(string memory _mail, string memory _uri) public payable returns(bool sufficient) {
        uint256 balance = IERC20(0x4200000000000000000000000000000000000006).balanceOf(msg.sender);
        require(balance >= msg.value, "Campaign::donate: Insuficient funds");
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
        if (donators[msg.sender] == false){
            //nfts.createSimpleNFT(_uri);
            donators[msg.sender] = true;
        }
        return true;
        
        
    }
    
    function expiredWithdraw() public {
        require(endTimeStamp < block.timestamp, "Campaign::expiredWithdraw: This campaign is still active");
        require(msg.sender == owner, "campaign::expiredWithdraw: Only the beneficiary can withdraw the funds");
        uint256 balance = IERC20(0x4200000000000000000000000000000000000006).balanceOf(address(this));
        owner.transfer(balance);
    }

    function withdraw() private returns(bool sufficient) {
        uint256 balance = IERC20(0x4200000000000000000000000000000000000006).balanceOf(address(this));
        owner.transfer(balance);
        return true;
        }
    
}