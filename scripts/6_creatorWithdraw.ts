
import { ethers } from "hardhat";
import { OurGirlfriend, MultiMint, OurGirlfriend__factory, MultiMint__factory } from "../typechain";
import { parseEther } from "@ethersproject/units";

async function main() {
    const MAX_MINTED_NFT = 3;
    const NFT_PRICE = 0.07;

    const [deployer] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("Account balance before withdraw:", (await deployer.getBalance()).toString());

    const ourGirlfriend = OurGirlfriend__factory.connect('0x5FbDB2315678afecb367f032d93F642f64180aa3', deployer) as OurGirlfriend;
    console.log('ourGirlfriend address: ' + ourGirlfriend.address);
  
    console.log("creator Withdraw: ", await ourGirlfriend.creatorWithdraw()) 
    console.log("Account balance after withdraw:", (await deployer.getBalance()).toString());
}  

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
