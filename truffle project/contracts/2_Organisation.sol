pragma solidity 0.7.6;
pragma abicoder v2;
import "./1_Campaign.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// SPDX-License-Identifier: MIT

contract Organisation {
    
        
    using SafeMath for uint;
    using SafeERC20 for IERC20;
    
    uint public campaignCounter;
    address public owner;
    address public v3factory;
    address public v3router;
    address public WETH;
    mapping(address => uint) public members;
    mapping(uint => Campaign) public campaigns;
    
    constructor(address _v3factory, address _v3router, address _WETH){
        v3router = _v3router;
        v3factory = _v3factory;
        WETH = _WETH;
        owner = msg.sender;
        members[owner] = 1;
    }
    
    
    function addCampaign(string memory _name, uint _goal, string memory _description, uint _endTimestamp, address payable _beneficiary, address _wantToken, string memory _uri, address _l2Address, address _wantTokenL2) public {
        require(members[msg.sender] == 1);
        require(_endTimestamp > block.timestamp, "Organisation::addCampaign: Campaign must end in the future");
        campaignCounter ++;
        campaigns[campaignCounter] = new Campaign(campaignCounter, _name, _goal, _description, _endTimestamp, _beneficiary, _wantToken, v3factory,
                                                v3router, WETH, _uri, _l2Address, _wantTokenL2);
    }
    
    function addMember(address _member) public {
        members[_member] = 1;
    }
}