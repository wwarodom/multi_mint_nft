### Minted OurGirlFriend NFT from MultiMinted Contract

##### Steps:
1. Receive funds to MultiMinted Contract
2. Call "startARelationship()" of "OurGirlfriend contract" by specifying the NFT contract address  
3. Withdraw ERC721 to a wallet
4. Withdraw leftover fund to a wallet

```shell
git clone https://github.com/wwarodom/multi_mint_nft.git
cd multi_mint_nft
npm install
npx hardhat run scripts/deploy.ts
```

 Have fun!!