
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { OurGirlfriend, MultiMint } from "../typechain";
import { parseEther } from "@ethersproject/units"; 


async function main() { 
    await deployments.fixture(["OurGirlfriend"]);
    // const {deployer} = await getNamedAccounts();
    const ogf = await ethers.getContract("OurGirlfriend"); 
    console.log(ogf.address)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  