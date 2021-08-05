// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;
pragma abicoder v2;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleNFT is ERC721 {
  uint256 public tokenCounter;
  constructor () public ERC721 ("Elf", "ELF"){
    tokenCounter = 0;
  }

  function createSimpleNFT(string memory tokenURI) public returns (uint256) {
    uint256 newItemId = tokenCounter;
    _safeMint(tx.origin, newItemId);
    _setTokenURI(newItemId, tokenURI);
    tokenCounter = tokenCounter + 1;
    return newItemId;
  }

}