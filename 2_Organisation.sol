pragma solidity >=0.7.0 <0.9.0;

import "./1_Campaign.sol";

contract Organisation {
    
    uint public campaignCounter;
    address public owner;
    mapping(address => uint) public members;
    mapping(uint => Campaign) public campaigns;
    
    constructor(){
        owner = msg.sender;
        members[owner] = 1;
    }
    
    
    function addCampaign(uint _id, string memory _name, uint _goal) public {
        require(members[msg.sender] == 1);
        campaignCounter ++;
        campaigns[campaignCounter] = new Campaign(_id, _name, _goal);
    }
    
    function addMember(address _member) public {
        require(owner == msg.sender);
        members[_member] = 1;
    }
    
    function donate(uint _id, uint _value) public {
        campaigns[_id].donate(_value);
        
        if (campaigns[_id].currFund() >= campaigns[_id].goal()) {
            delete campaigns[_id];
        }
    }
}