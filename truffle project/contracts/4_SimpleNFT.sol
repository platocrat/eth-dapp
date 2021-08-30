// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721, Ownable {
  using Strings for uint256;
  uint256 public tokenCounter;
  mapping (uint256 => string) private _tokenURIs;

    // Base URI
  string private _baseURIextended;
  constructor () public ERC721 ("Elf", "ELF"){
    tokenCounter = 0;
  }
  function setBaseURI(string memory baseURI_) external {
        _baseURIextended = baseURI_;
    }
 
  function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual override {
    require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
    _tokenURIs[tokenId] = _tokenURI;
  }
    
  function _baseURI() internal view virtual returns (string memory) {
    return _baseURIextended;
  }
  function createSimpleNFT(string memory tokenURI) public returns (uint256) {
    uint256 newItemId = tokenCounter;
    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);
    tokenCounter = tokenCounter + 1;
    return newItemId;
  }

}