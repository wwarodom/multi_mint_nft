import { ethers } from "hardhat";
import { OurGirlfriend, MultiMint } from "../typechain";
import { parseEther } from "@ethersproject/units";

async function main() {
  const MAX_MINTED_NFT = 5;
  const NFT_PRICE = 0.07;

  const OurGirlfriend = await ethers.getContractFactory("OurGirlfriend");
  const girlfriend: OurGirlfriend = await OurGirlfriend.deploy();
  console.log("GirlFriend is deployed at:", girlfriend.address);

  const MultiMint = await ethers.getContractFactory("MultiMint");
  const multiMint: MultiMint = await MultiMint.deploy(girlfriend.address);
  console.log("MultiMint is deployed at:", multiMint.address);

  const [deployer] = await ethers.getSigners();
  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const amount = parseEther((MAX_MINTED_NFT * NFT_PRICE) + '');
  await multiMint.deposit({ value: amount });

  console.log('MultiMint contract balance before minted: ' + await multiMint.balance());
  await multiMint.minty(MAX_MINTED_NFT);
  console.log('MultiMint contract balance after minted: ' + await multiMint.balance());
  console.log("Account balance:", (await deployer.getBalance()).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
