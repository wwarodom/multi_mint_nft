
import { ethers } from "hardhat";
import { OurGirlfriend, MultiMint, OurGirlfriend__factory, MultiMint__factory } from "../typechain";
import { parseEther } from "@ethersproject/units";

async function main() {
    const MAX_MINTED_NFT = 3;
    const NFT_PRICE = 0.07;

    const [deployer] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const ourGirlfriend = OurGirlfriend__factory.connect('0x5FbDB2315678afecb367f032d93F642f64180aa3', deployer) as OurGirlfriend;
    console.log('OurGirlfriend address: ' + ourGirlfriend.address);

    const multiMint = MultiMint__factory.connect('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', deployer) as MultiMint;
    console.log('MultiMint address: ' + multiMint.address);

    const total = Number(await ourGirlfriend.totalSupply());

    console.log("Total supply: ", total);

    for (let i = 0; i < total; i++)
        console.log(`Relationship ${i} ${await ourGirlfriend.relationshipStatus(i)}`);


    console.log(await ourGirlfriend.howIsSheFeeling());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
