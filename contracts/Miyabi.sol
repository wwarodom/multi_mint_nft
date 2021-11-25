// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Miyabi is ERC721 {
    constructor() payable ERC721("Miyabi", "MIYABI") {}
}
