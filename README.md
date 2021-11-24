### Minted OurGirlFriend NFT from MultiMinted Contract

Asami was programmed on-chain with a single purpose: to find her soulmate and give them her heart. [Idol Research](https://www.idolresearchers.com/) 

This example is to demonstrate how to mint multiple OurGirlFriend NFTs from a smart contract, and call all the rest functions.

##### Steps:
1. Receive funds to MultiMinted Contract
2. Call "startARelationship()" of "OurGirlfriend contract" by specifying the NFT contract address  
3. Withdraw ERC721 to a wallet
4. Withdraw leftover fund to a wallet

```shell
git clone https://github.com/wwarodom/multi_mint_nft.git
cd multi_mint_nft
npm install
npx hardhat node
npx hardhat --network localhost run scripts/[your_file].ts
```

or deploy at Rinkeby network (Don't forget to change filename of .env.example to .env and update URL and PRIVATE_KEY with your credentials)
```
npx hardhat run scripts/deploy.ts --network rinkeby
```

 Have fun!!