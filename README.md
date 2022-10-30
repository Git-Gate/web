# 👾 GitGate

Welcome to **GitGate**, a web app that allows repository owners to setup token-gated access controls to GitHub repositories.

## What is GitGate?

GitGate is a Dapp that allows the owner of a github repository to invite contributors to his repo if they connect their wallet and hold tokens (ERC20, ERC721, ERC1155) according to the on-chain requirements defined. The contributor receives an NFT soulbound token (aka **Proof of Github Membership** or, in short, **POGM**) that can be used on on-chain governances.

### POGM for governance decisions

A POGM token has the OpenZeppelin ERC721Votes capability in order to be used as a governance contract in a Governor contract and on DAO platform such as Tally DAO.

This behavior unlocks a powerful use case: manage an on-chain DAO within a Github Repo.

Imagine an open-source project and/or a community receiving a grant or, generally speaking, managing money to develop a tech project. Developers working on the project decide to use Github to manage their codes. The repository owner set different and multiple requirements through GitGate in order to join the repo as a contributor. All users respecting the requirements can mint the POGM representing the repo access. Minting the POGM gives them the repository access. The repo owner creates a Governor contract setting the POGM token address as voting token. Now developers can vote to manage and transfer the project funds to pay developers, marketing, etc..

## GitGate stack

GitGate is a web application developed in Next.js and hosted on Vercel. The web part uses React js, Ethers.js and interacts with a REST API that exploits the same service (i.e., the same Next.js application).

The wallet connection on the blockchain uses the new [Wallet Connect Web3Modal v2 library](https://github.com/WalletConnect/web3modal). The connection with Github is performed following the OAuth standard.

There is an off-chain database part that uses MongoDB where the application store some user data (wallet address, Github login, Github name, Github avatar, Github bio, Github token). By the way the database is only used to offer a better UX/UI to users, the application could completely work without it.

To manage Github repository invitations GitGate uses a Github App that needs to be installed on the repositories to be tokenized through which GitGate can invite new contributors.

GitGate uses Thirdweb to facilitate the interaction with smart contracts. All other smart contracts are written in Solidity with the Hardhat framework. 
For Metadata hosting it is used NFT.storage to upload data on IPFS.

Infura is used for ENS resolution from an address. The API REST use a call authentication strategy related to JWT.

Finally Tailwind library is used for the CSS aspect.

## How GitGate works ?

Here the application flow is described.

**Repo Owner side**

1. After landing on the site, the user registers by connecting his wallet and connecting his GitHub account
2. He decides to create a new "tokenized repo”
   1. Selects a repo from the list of which his GitHub account appears to be an Owner or Maintainer
   2. Defines a list of tokens (ERC20, ERC721, ERC1155) required to access the repo
3. Gets a link with which to "invite" other people to his "tokenized repo" newly created
4. Finally, each user has a dashboard where he can manage all the "tokenized repos" he has created
5. The repo owner can transfer its ownership, can change the requirements of the repo and blacklist addresses. The smart contract even allows to define three different roles for these permissions

**Repo Contributor side**

1. After clicking on the invitation link to the "tokenized repo"_,_ the user registers by connecting his wallet and his GitHub account
   1. Once the wallet is connected GitGate checks that the user meets the specified requirements to access the "tokenized repo "
   2. If yes, the user will receive the POGM soulbound NFT that recognizes him as on-chain proof of his participation in the repo and also will be invited to the repo itself (via GitHub API). The POGM is a soulbound `ERC721Votes` token
   3. If not, he will see an error message
