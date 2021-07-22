pragma solidity >=0.7.0 <0.9.0;

contract Campaign {
    
    uint public id;
    string public name;
    uint public currFund;
    uint public goal;
    address[] public funders;
    address public owner;
    mapping(address => uint) public fundings;
    bool finished = false;
    
    constructor(uint _id, string memory _name, uint _goal){
        id = _id;
        name = _name;
        currFund = 0;
        goal = _goal;
        owner = msg.sender;
    }
    
    event goalReached(uint totalFund, uint campaignId, string name, address[] funders);
    
    function donate() public payable returns(bool sufficient) {
        if (tx.origin.balance < msg.value) return false;
        currFund += msg.value;
        fundings[msg.sender] += value;
        funders.push(tx.origin)
        
        if (currFund >= goal) {
            emit goalReached(currFund, id, name, funders);
            finished = true;
        }
        return true;
    }

    function withdraw(address payable _recipient) public payable returns(bool sufficient) {
        require(_recipient == owner);
        _recipient.transfer(address(this).balance);
        return true;
        }
    
}