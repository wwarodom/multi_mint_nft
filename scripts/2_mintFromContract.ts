
import { ethers } from "hardhat";
import { OurGirlfriend, MultiMint, OurGirlfriend__factory, MultiMint__factory } from "../typechain";
import { parseEther } from "@ethersproject/units";

async function main() {
    const MAX_MINTED_NFT = 6;
    const NFT_PRICE = 0.07;
 
    const [deployer] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const ourGirlfriend = OurGirlfriend__factory.connect('0x5FbDB2315678afecb367f032d93F642f64180aa3', deployer) as OurGirlfriend;
    console.log('ourGirlfriend ' + ourGirlfriend.address);

    console.log("Owner: ", await ourGirlfriend.owner());

    const multiMint = MultiMint__factory.connect('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', deployer) as MultiMint;
    console.log('multiMint ' + multiMint.address);

    const amount = parseEther((MAX_MINTED_NFT * NFT_PRICE) + '');
    await multiMint.deposit({ value: amount });

    const start = Number(await ourGirlfriend.totalSupply());

    console.log('MultiMint contract balance before minted: ' + await multiMint.balance());
    console.log("Relationship: " + await ourGirlfriend.relationshipStatus(start))

    await multiMint.minty( start , MAX_MINTED_NFT);
    console.log('MultiMint contract balance after minted: ' + await multiMint.balance());
    console.log("Relationship: " + await ourGirlfriend.relationshipStatus(start))
    console.log("Account balance:", (await deployer.getBalance()).toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
