
import { ethers } from "hardhat";
import { OurGirlfriend, MultiMint, OurGirlfriend__factory } from "../typechain";
import { parseEther } from "@ethersproject/units"; 

async function main() { 

    const [deployer] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
 
    const ogf = OurGirlfriend__factory.connect('0x5FbDB2315678afecb367f032d93F642f64180aa3', deployer) as OurGirlfriend;
    console.log('ogf ' + await ogf.address);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
