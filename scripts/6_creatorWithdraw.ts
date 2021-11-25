
import { ethers } from "hardhat";
import { OurGirlfriend, OurGirlfriend__factory } from "../typechain"; 
import OurGirlfriendArtifact from "../deployments/localhost/OurGirlfriend.json";

async function main() { 
    const [deployer] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("Account balance before withdraw:", (await deployer.getBalance()).toString());

    const ourGirlfriend = OurGirlfriend__factory.connect(OurGirlfriendArtifact.address, deployer) as OurGirlfriend;
    console.log('ourGirlfriend address: ' + ourGirlfriend.address);
  
    console.log("creator Withdraw: ", await ourGirlfriend.creatorWithdraw()) 
    console.log("Account balance after withdraw:", (await deployer.getBalance()).toString());
}  

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
