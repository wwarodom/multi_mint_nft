
import { ethers } from "hardhat";
import { OurGirlfriend, MultiMint, OurGirlfriend__factory, MultiMint__factory } from "../typechain";
import { parseEther } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

async function main() {
    const MAX_MINTED_NFT = 3;
    const NFT_PRICE = 0.07;

    const [deployer, d1] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("Account balance before woo:", (await deployer.getBalance()).toString());

    const ourGirlfriend = OurGirlfriend__factory.connect('0x5FbDB2315678afecb367f032d93F642f64180aa3', deployer) as OurGirlfriend;
    console.log('OurGirlfriend address: ' + ourGirlfriend.address);

    const multiMint = MultiMint__factory.connect('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', deployer) as MultiMint;
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
