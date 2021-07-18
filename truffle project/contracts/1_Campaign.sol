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
    
    function donate() public payable returns(bool sufficient) {
        if (tx.origin.balance < msg.value) return false;
        currFund += msg.value; // ?
        //msg.sender.balance -= msg.value;
        //address(this).balance += msg.value;
        funders.push(tx.origin);
        return true;

        //emit Transfer(msg.sender, receiver, amount);
        
        if (currFund >= goal) {
            emit goalReached(currFund, id, name, funders);
        }
    }

    function getBalanceInEth(address _addr) public view returns(uint){
        return currFund;
        //return ConvertLib.convert(_addr.balance+i,2);
    }
    
}