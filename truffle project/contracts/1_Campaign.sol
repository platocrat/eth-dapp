pragma solidity >=0.7.0 <0.9.0;

contract Campaign {
    
    uint public id;
    string public name;
    uint public currFund;
    uint public goal;
    address[] public funders;
    address public owner;
    mapping(address => uint) public fundings;
    bool public finished = false;
    string public description;
    
    constructor(uint _id, string memory _name, uint _goal, string memory _description){
        id = _id;
        name = _name;
        currFund = 0;
        goal = _goal;
        description = _description;
        owner = tx.origin;
    }
    
    event goalReached(uint totalFund, uint campaignId, string name, address[] funders);
    
    function donate() public payable returns(bool sufficient) {
        if (tx.origin.balance < msg.value) return false;
        currFund += msg.value;
        fundings[msg.sender] += msg.value;
        funders.push(tx.origin);
        
        if (currFund >= goal) {
            emit goalReached(currFund, id, name, funders);
            finished = true;
        }
        return true;
    }

    function withdraw(address payable _recipient) public payable returns(bool sufficient) {
        require(_recipient == owner && msg.sender == owner);
        _recipient.transfer(address(this).balance);
        currFund = 0;
        return true;
        }
    
}