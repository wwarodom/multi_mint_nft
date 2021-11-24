
import { ethers } from "hardhat";
import { OurGirlfriend, OurGirlfriend__factory} from "../typechain";


async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const ourGirlfriend = OurGirlfriend__factory.connect('0x5FbDB2315678afecb367f032d93F642f64180aa3', deployer) as OurGirlfriend;
    console.log('ogf ' + ourGirlfriend.address); 

    console.log("Relationship: " + await ourGirlfriend.tokenURI(0))
    const tokenUri = (await ourGirlfriend.tokenURI(0)).split(",");
    console.log(tokenUri[1]);
    console.log(JSON.parse(Buffer.from(tokenUri[1], 'base64').toString()).image);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
