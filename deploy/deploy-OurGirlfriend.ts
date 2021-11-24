import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types'; 

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const ogfContract = await deploy("OurGirlfriend", {
    from: deployer,
    args: [],
    log: true,
  });

  await deploy("MultiMint", {
    from: deployer,
    args: [ogfContract.receipt?.contractAddress],
    log: true,
  });
};
export default func;
func.tags = ["OurGirlfriend", "MultiMint"];
