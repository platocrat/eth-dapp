pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;
import "./1_Campaign.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// SPDX-License-Identifier: MIT

contract Organisation {
    
        
    using SafeMath for uint;
    using SafeERC20 for IERC20;
    
    uint public campaignCounter;
    address public owner;
    mapping(address => uint) public members;
    mapping(uint => Campaign) public campaigns;
    
    constructor(){
        owner = msg.sender;
        members[owner] = 1;
    }
    
    
    function addCampaign(string memory _name, uint _goal, string memory _description, uint _endTimestamp, address payable _beneficiary) public {
        require(members[msg.sender] == 1);
        require(_endTimestamp > block.timestamp, "Organisation::addCampaign: Campaign must end in the future");
        campaignCounter ++;
        campaigns[campaignCounter] = new Campaign(campaignCounter, _name, _goal, _description, _endTimestamp, _beneficiary);
    }
    
    function addMember(address _member) public {
        members[_member] = 1;
    }
}