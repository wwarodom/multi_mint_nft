import { ethers } from "hardhat";
import { OurGirlfriend, MultiMint } from "../typechain";
import { parseEther } from "@ethersproject/units"; 

async function main() {
  const MAX_MINTED_NFT = 1;
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

  // console.log("Relationship: " + await girlfriend.relationshipStatus(0))
  // console.log("Relationship: " + await girlfriend.tokenURI(0))

  let woo = await girlfriend.woo(0);
  let woo1 = await woo.wait();
  const result = (woo1.events?.filter((x) => { return x.event == "Wooed" }));
  const [_wooer, tokenId, _newScore] = result?.pop()?.args as any;
  console.log('Wooed event: ', _wooer, tokenId, _newScore);
 
  console.log("Relationship 0: " + await girlfriend.relationshipStatus(0))
  console.log("Relationship 1: " + await girlfriend.relationshipStatus(1))
  // console.log("Relationship: " + await girlfriend.tokenURI(0))
  const tokenUri = (await girlfriend.tokenURI(0)).split(",");
  // console.log(tokenUri[1]);
  console.log(JSON.parse(Buffer.from(tokenUri[1], 'base64').toString()).image);

  console.log(await girlfriend.howIsSheFeeling());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
