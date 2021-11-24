// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./OurGirlfriend.sol"; 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; 
// import "hardhat/console.sol";

contract MultiMint is ERC721Enumerable {
    OurGirlfriend private ogf;

    address payable public owner;

    constructor(address payable _ogf) payable ERC721("Madoka", "MADOKA") {
        ogf = OurGirlfriend(payable(_ogf));
        owner = payable(msg.sender);
    }

    function deposit() public payable {}
 
    function withdraw() public {
        uint256 amount = address(this).balance;
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Failed to withdraw Ether");
    }

    function balance() public view returns (uint256) {
        return address(this).balance;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function minty(uint256 amount) public payable {
        for (uint256 i = 0; i < amount; i++) {
            ogf.startARelationship{value: 0.07 ether}();
            _transferNFTtoUser(i);
        }
        withdraw(); // take Ether back to the contract owner
    }

    function _transferNFTtoUser(uint256 tokenId) private {
        ogf.approve(msg.sender, tokenId);
        ogf.transferFrom(address(this), msg.sender, tokenId);
    }
}
