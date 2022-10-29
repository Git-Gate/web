import {ethers} from "ethers";

export const deployRepositoryRegistryContract = async (
  repo: any,
  messageHash: string,
  signature: string
) => {
  let provider = new ethers.providers.AlchemyProvider(
    {
      chainId: 80001,
      name: "maticmum",
    },
    process.env.ALCHEMY_API_KEY as string
  );

  // Load the wallet to deploy the contract with
  const wallet = new ethers.Wallet(
    process.env.GIT_GATE_WALLET_PVT_KEY as string,
    provider
  );

  const contract = new ethers.Contract(
    process.env.REGISTRY_CONTRACT_ADDRESS as string,
    JSON.parse(registryContractAbi.result),
    provider
  );

  const contractWithSigner = contract.connect(wallet);

  await contractWithSigner.functions.createTokenizedRepo(
    repo,
    messageHash,
    signature,
    {
      gasLimit: 3000000,
    }
  );
};

export const registryContractAbi = {
  status: "1",
  message: "OK",
  result:
    '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"githubRepoId","type":"uint256"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"uint256","name":"role","type":"uint256"}],"name":"AccessDenied","type":"error"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"RepositoryAlreadyExists","type":"error"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"RepositoryNotExists","type":"error"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"WrongSignerAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_addr","type":"address"}],"name":"BlacklistedAddressCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"repoId","type":"uint256"},{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"RepositoryCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"repoId","type":"uint256"}],"name":"RequirementsChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"repoId","type":"uint256"},{"indexed":false,"internalType":"address","name":"newOperator","type":"address"},{"indexed":false,"internalType":"uint256","name":"role","type":"uint256"}],"name":"RoleChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"repoId","type":"uint256"},{"indexed":false,"internalType":"address","name":"soulboundContract","type":"address"}],"name":"SoulboundCreated","type":"event"},{"inputs":[],"name":"BLACKLIST_ADMINISTRATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NFT_FACTORY_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REPOSITORY_OWNER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REQUIREMENTS_ADMINISTRATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_githubRepoId","type":"uint256"},{"internalType":"address[]","name":"_collections","type":"address[]"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"changeRequirements","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"repoId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"checkUserRequirements","outputs":[{"internalType":"bool","name":"authorized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"githubRepoId","type":"uint256"},{"internalType":"address[]","name":"operators","type":"address[]"},{"internalType":"uint256[]","name":"op","type":"uint256[]"},{"internalType":"address[]","name":"blacklistedAddresses","type":"address[]"},{"internalType":"address[]","name":"collections","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"address","name":"soulBoundTokenContract","type":"address"},{"internalType":"string","name":"tokenizedRepoName","type":"string"},{"internalType":"string","name":"soulboundBaseURI","type":"string"}],"internalType":"struct POGMRegistry.RepositoryRequirements","name":"newRepo","type":"tuple"},{"internalType":"bytes32","name":"hashedMessage","type":"bytes32"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"createTokenizedRepo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"database","outputs":[{"internalType":"uint256","name":"githubRepoId","type":"uint256"},{"internalType":"address","name":"soulBoundTokenContract","type":"address"},{"internalType":"string","name":"tokenizedRepoName","type":"string"},{"internalType":"string","name":"soulboundBaseURI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"repoId","type":"uint256"}],"name":"getSoulBoundBaseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"repoId","type":"uint256"}],"name":"getTokenizedRepoName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenizedRepoId","type":"uint256"}],"name":"getTokenizedRepoOwner","outputs":[{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_addresses","type":"address[]"},{"internalType":"uint256","name":"_githubRepoId","type":"uint256"}],"name":"setBlacklistedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_factory","type":"address"}],"name":"setFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_githubRepoId","type":"uint256"},{"internalType":"uint256","name":"_op","type":"uint256"},{"internalType":"address","name":"_newValue","type":"address"}],"name":"setOperator","outputs":[{"internalType":"address","name":"oldValue","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_repoId","type":"uint256"},{"internalType":"address","name":"_soulboundContract","type":"address"}],"name":"setSoulboundAfterCreation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]',
};

export const soulboundFactoryContractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "POGMAddress",
        type: "address",
      },
    ],
    name: "Already_Created",
    type: "error",
  },
  {
    inputs: [],
    name: "Not_Existing_Repo",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "POGMAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenizedRepo",
        type: "uint256",
      },
    ],
    name: "newPOGMCollection",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenizedRepoId",
        type: "uint256",
      },
    ],
    name: "createPOGMToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_POGMRegistry",
        type: "address",
      },
      {
        internalType: "address",
        name: "OZForwarder",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "forwarder",
        type: "address",
      },
    ],
    name: "isTrustedForwarder",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "POGMRegistry",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "POGMs",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
