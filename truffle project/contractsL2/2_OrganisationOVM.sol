pragma solidity 0.7.6;
pragma abicoder v2;
import "./1_CampaignOVM.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// SPDX-License-Identifier: MIT

contract Organisation {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    uint256 public campaignCounter;
    address public owner;
    mapping(address => uint256) public members;
    mapping(uint256 => Campaign) public campaigns;

    constructor() {}

    function addCampaign(
        string memory _name,
        uint256 _goal,
        string memory _description,
        uint256 _endTimestamp,
        address _wantToken,
        string memory _uri
    ) public {
        require(members[msg.sender] == 1);
        require(
            _endTimestamp > block.timestamp,
            "Organisation::addCampaign: Campaign must end in the future"
        );
        campaignCounter++;
        campaigns[campaignCounter] = new Campaign(
            campaignCounter,
            _name,
            _goal,
            _description,
            _endTimestamp,
            _wantToken,
            _uri
        );
    }

    function addMember(address _member) public {
        members[_member] = 1;
    }
}
