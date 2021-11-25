
import { ethers } from "hardhat";
import { OurGirlfriend, MultiMint, OurGirlfriend__factory, MultiMint__factory } from "../typechain";
import  MultimintArtifact  from "../deployments/localhost/MultiMint.json";
import OurGirlfriendArtifact from "../deployments/localhost/OurGirlfriend.json";

async function main() { 
    const [deployer] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const ourGirlfriend = OurGirlfriend__factory.connect(OurGirlfriendArtifact.address, deployer) as OurGirlfriend;
    console.log('OurGirlfriend address: ' + ourGirlfriend.address);

    const multiMint = MultiMint__factory.connect(MultimintArtifact.address, deployer) as MultiMint;
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
