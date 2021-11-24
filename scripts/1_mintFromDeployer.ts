
import { ethers } from "hardhat";
import { OurGirlfriend, OurGirlfriend__factory } from "../typechain";
import { parseEther } from "@ethersproject/units";

async function main() { 
    const NFT_PRICE = 0.07;
 
    const [deployer] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const ourGirlfriend = OurGirlfriend__factory.connect('0x5FbDB2315678afecb367f032d93F642f64180aa3', deployer) as OurGirlfriend;
    console.log('OurGirlfriend address: ' + ourGirlfriend.address);

    console.log("Owner: ",await ourGirlfriend.owner());

    console.log("Relationship: " + await ourGirlfriend.relationshipStatus(0));

    const amount = parseEther((NFT_PRICE) + ''); 
    console.log("Mint: ", await ourGirlfriend.startARelationship({ value: amount }));
    console.log("Relationship: " + await ourGirlfriend.relationshipStatus(0));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
