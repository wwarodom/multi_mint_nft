
import { ethers } from "hardhat";
import { OurGirlfriend, MultiMint, OurGirlfriend__factory, MultiMint__factory } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import  MultimintArtifact  from "../deployments/localhost/MultiMint.json";
import OurGirlfriendArtifact from "../deployments/localhost/OurGirlfriend.json";

async function main() {
    const [deployer, d1] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("Account balance before woo:", (await deployer.getBalance()).toString());

    const ourGirlfriend = OurGirlfriend__factory.connect(OurGirlfriendArtifact.address, deployer) as OurGirlfriend;
    console.log('OurGirlfriend address: ' + ourGirlfriend.address);

    const multiMint = MultiMint__factory.connect(MultimintArtifact.address, deployer) as MultiMint;
    console.log('MultiMint address: ' + multiMint.address);

    await woo(ourGirlfriend, deployer, 0); 
    // await woo(ourGirlfriend, deployer, 3); 
    // await woo(ourGirlfriend, d1, 2);     // Not in relation

    console.log("Account balance after woo:", (await deployer.getBalance()).toString());
}

async function woo(ourGirlfriend: OurGirlfriend, dep: SignerWithAddress, id: number) {
    let tx = await ourGirlfriend.connect(dep).woo(id);
    let woo = await tx.wait();
    const result = (woo.events?.filter((x) => { return x.event == "Wooed" }));
    const [_wooer, tokenId, _newScore] = result?.pop()?.args as any;
    console.log('Wooed event: ', _wooer, +tokenId, +_newScore);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
