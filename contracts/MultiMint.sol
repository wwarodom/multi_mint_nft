// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./OurGirlfriend.sol"; 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; 
// import "hardhat/console.sol";

contract MultiMint is ERC721Enumerable {
    OurGirlfriend private ourGirlfriend;

    address payable public owner;

    constructor(address payable _ogf) payable ERC721("Madoka", "MADOKA") {
        ourGirlfriend = OurGirlfriend(payable(_ogf));
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

    // Guarantee the safety of an NFT transferred to the receiving contract.
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function minty(uint start, uint end) public payable {
        for (uint256 i = 0; i < end; i++) {
            ourGirlfriend.startARelationship{value: 0.07 ether}();
            _transferNFTtoUser(start+i);
        }
        withdraw(); // take Ether back to the contract owner
    }

    function _transferNFTtoUser(uint256 tokenId) private {
        ourGirlfriend.approve(msg.sender, tokenId);
        ourGirlfriend.transferFrom(address(this), msg.sender, tokenId);
    }
}
