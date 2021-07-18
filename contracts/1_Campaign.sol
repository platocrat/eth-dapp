pragma solidity >=0.7.0 <0.9.0;

contract Campaign {
    
    uint public id;
    string public name;
    uint public currFund;
    uint public goal;
    address[] public funders;
    
    constructor(uint _id, string memory _name, uint _goal){
        id = _id;
        name = _name;
        currFund = 0;
        goal = _goal;
    }
    
    event goalReached(uint totalFund, uint campaignId, string name, address[] funders);
    
    function donate(uint _value) external payable {
        currFund+=_value;
        funders.push(tx.origin);
        
        if (currFund == goal) {
            emit goalReached(currFund, id, name, funders);
        }
    }
    
}