"use client";

import {
  ArrowPathRoundedSquareIcon,
  ClipboardDocumentIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import {useAccount, useContract, useSigner} from "@web3modal/react";
import axios from "axios";
import {ethers} from "ethers";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import NewBlacklistSlide from "../../../components/newBlacklistSlide";
import NewRequirementSlide from "../../../components/newRequirementSlide";
import RepoImage from "../../../components/repoImage";
import {shortenHex} from "../../../utils";

const registryABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "githubRepoId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
    ],
    name: "AccessDenied",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "GeneralError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "RepositoryAlreadyExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "RepositoryNotExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "WrongSignerAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "BlacklistedAddressCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "repoId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "RepositoryCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "repoId",
        type: "uint256",
      },
    ],
    name: "RequirementsChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "repoId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOperator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
    ],
    name: "RoleChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "repoId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "soulboundContract",
        type: "address",
      },
    ],
    name: "SoulboundCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "BLACKLIST_ADMINISTRATOR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NFT_FACTORY_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REPOSITORY_OWNER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REQUIREMENTS_ADMINISTRATOR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_githubRepoId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_collections",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "changeRequirements",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "repoId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "checkUserRequirements",
    outputs: [
      {
        internalType: "bool",
        name: "authorized",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "githubRepoId",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "operators",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "op",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "blacklistedAddresses",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "collections",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "ids",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
          {
            internalType: "address",
            name: "soulBoundTokenContract",
            type: "address",
          },
          {
            internalType: "string",
            name: "tokenizedRepoName",
            type: "string",
          },
          {
            internalType: "string",
            name: "soulboundBaseURI",
            type: "string",
          },
        ],
        internalType: "struct POGMRegistry.RepositoryRequirements",
        name: "newRepo",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "hashedMessage",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "createTokenizedRepo",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "database",
    outputs: [
      {
        internalType: "uint256",
        name: "githubRepoId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "soulBoundTokenContract",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenizedRepoName",
        type: "string",
      },
      {
        internalType: "string",
        name: "soulboundBaseURI",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "repoId",
        type: "uint256",
      },
    ],
    name: "getBlacklistedAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "repoId",
        type: "uint256",
      },
    ],
    name: "getRequirements",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "githubRepoId",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "operators",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "op",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "blacklistedAddresses",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "collections",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "ids",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
          {
            internalType: "address",
            name: "soulBoundTokenContract",
            type: "address",
          },
          {
            internalType: "string",
            name: "tokenizedRepoName",
            type: "string",
          },
          {
            internalType: "string",
            name: "soulboundBaseURI",
            type: "string",
          },
        ],
        internalType: "struct POGMRegistry.RepositoryRequirements",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "repoId",
        type: "uint256",
      },
    ],
    name: "getSoulBoundBaseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "repoId",
        type: "uint256",
      },
    ],
    name: "getTokenizedRepoName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenizedRepoId",
        type: "uint256",
      },
    ],
    name: "getTokenizedRepoOwner",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_addresses",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_githubRepoId",
        type: "uint256",
      },
    ],
    name: "setBlacklistedAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
    ],
    name: "setFactory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_repoId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_soulboundContract",
        type: "address",
      },
    ],
    name: "setSoulboundAfterCreation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_githubRepoId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_op",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_newValue",
        type: "address",
      },
    ],
    name: "transferRole",
    outputs: [
      {
        internalType: "address",
        name: "oldValue",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function RepoPage({params}: {params: any}) {
  const {account} = useAccount();
  const {data, refetch} = useSigner();
  const [isOwner, setIsOwner] = useState(false);
  const [repository, setRepository] = useState<any>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [blacklistOpen, setBlacklistOpen] = useState(false);
  const {push} = useRouter();

  useEffect(() => {
    if (account.address && !repository && !error) getRepository();
  }, [account]);

  const getRepository = async () => {
    setLoading(true);
    try {
      const repositoryRes = await axios.get(
        `/api/repositories/${params.address}`
      );
      setRepository(repositoryRes.data);
      setIsOwner(
        repositoryRes.data.ownerAddress.toLowerCase() ===
          account.address.toLowerCase()
      );
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const connectGitGate = async () => {};

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl animate-pulse">Loading...</h1>
      </div>
    );
  }

  if (!repository) {
    return (
      <div className="h-screen max-w-3xl mx-auto flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl md:text-5xl text-center font-extrabold z-20">
          <p>🤨</p>
          <p className="mt-4">
            The repository you're looking for does not exist.
          </p>
        </h1>
        <div className="px-8 md:px-0">
          <p
            className="text-gray-400 underline cursor-pointer select-none"
            onClick={() => push("/")}
          >
            Back to homepage
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative inset-0 w-full min-h-screen md:fixed md:w-4/12 bg-indigo-500">
        <div className="flex flex-col items-center space-y-4 py-36 px-4">
          <RepoImage name={repository.name} className="h-64 w-64 rounded-lg" />
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold">{repository.name}</h1>
            <p className="max-w-sm text-center text-sm">
              {repository.description}
            </p>
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://web-gitgate.vercel.app/invite/repo?repoId=${repository._id}`
                )
              }
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:scale-105 transition-transform w-full"
            >
              <ClipboardDocumentIcon className="h-4 mr-2" />
              <span>Copy access link</span>
            </button>
            {isOwner && (
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `https://web-gitgate.vercel.app/repositories?repoId=${repository._id}`
                  )
                }
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full"
              >
                <ArrowPathRoundedSquareIcon className="h-4 mr-2" />
                <span>Transfer ownership</span>
              </button>
            )}
            {false && (
              <div
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
                onClick={() => connectGitGate()}
              >
                Connect GitGate
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full ml-auto md:w-8/12">
        <div className="flex flex-col items-start justify-start space-y-8 h-screen bg-black py-24 md:py-36 px-8 text-white">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold flex items-center space-x-4">
              <span>Requirements</span>
              {/*
                  <PlusCircleIcon
                className="h-6 w-6 cursor-pointer select-none mb-0.5"
                onClick={() => {
                  setBlacklistOpen(false);
                  setOpen(true);
                }}
              />
                */}
            </h3>
            {repository.requirements.length === 0 && (
              <p className="mt-2 text-gray-300">No token requirement!</p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 mt-2 gap-4">
              {repository.requirements.map((requirement: any) => {
                if (requirement.type === "erc-20") {
                  return (
                    <Link
                      href={`https://mumbai.polygonscan.com/token/${requirement.address}`}
                      target={"_blank"}
                    >
                      <div className="bg-white transition-transform hover:scale-105 px-4 py-2 rounded-lg text-black select-none cursor-pointer flex items-center justify-center">
                        <span className="text-xs">
                          {requirement.amount} {shortenHex(requirement.address)}{" "}
                          - {requirement.type.toUpperCase()}
                        </span>
                      </div>
                    </Link>
                  );
                }
                return (
                  <Link
                    href={`https://mumbai.polygonscan.com/token/${requirement.address}`}
                    target={"_blank"}
                  >
                    <div className="bg-white transition-transform hover:scale-105 px-4 py-2 rounded-lg text-black select-none cursor-pointer flex items-center justify-center">
                      <span className="text-xs">
                        {shortenHex(requirement.address)} -{" "}
                        {requirement.type.toUpperCase()}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold flex items-center space-x-4">
              <span>Blacklist</span>
              {/* <PlusCircleIcon
                className="h-6 w-6 cursor-pointer select-none mb-0.5"
                onClick={() => {
                  setOpen(false);
                  setBlacklistOpen(true);
                }}
              />*/}
            </h3>
            {repository.blacklistedAddresses.filter(
              (address: string) => address !== ""
            ).length === 0 && (
              <p className="mt-2 text-gray-300">No blacklisted address!</p>
            )}
            <div className="grid grid-cols-1 mt-2 gap-4">
              {repository.blacklistedAddresses
                .filter((address: string) => address !== "")
                .map((address: string) => {
                  return (
                    <span
                      onClick={() => push(`/profile/${address}`)}
                      className="text-xs bg-white transition-transform hover:scale-105 px-4 py-2 rounded-lg text-black select-none cursor-pointer flex items-center justify-center"
                    >
                      {shortenHex(address, 5)}
                    </span>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold flex items-center space-x-4">
              <span>Members</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-2 gap-4">
              {repository.memberAddresses.map((address: string) => {
                return (
                  <span
                    onClick={() => push(`/profile/${address}`)}
                    className="bg-white text-xs transition-transform hover:scale-105 px-4 py-2 rounded-lg text-black select-none cursor-pointer flex items-center justify-center"
                  >
                    {shortenHex(address, 8)}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* <NewRequirementSlide
        open={open}
        setOpen={setOpen}
        submitRequirement={(requirement) => addNewRequirement(requirement)}
      />
      <NewBlacklistSlide
        open={blacklistOpen}
        setOpen={setBlacklistOpen}
        submitBlacklist={(blacklist) => console.log(blacklist)}
      /> */}
    </div>
  );
}

{
  /*

        <hr className="my-4"/>
        <h3 className="text-xl font-semibold">Github Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-2 gap-4">
            <div className="flex flex-col">
                <h4>License - {githubData.license.name}</h4>
                <h4>Archived - { githubData.archived ? '✅' : '❌'}</h4>
                <h4>Disabled - { githubData.disabled ? '✅' : '❌'}</h4>
            </div>
            <div className="flex flex-col">
                <h4>Issues - {githubData.open_issues_count}</h4>
                <h4>Watchers - { githubData.watchers_count}</h4>
                <h4>Forks - { githubData.forks_count}</h4>
            </div>
            <div className="flex flex-col">
                <h4>Created at - {githubData.created_at}</h4>
                <h4>Updated at - { githubData.updated_at}</h4>
                <h4>Pushed at - { githubData.pushed_at}</h4>
            </div>
        </div>
    */
}

/*
<div className="h-screen flex flex-col items-center py-36 px-8">
      <div className="flex flex-col space-y-4">
        <RepoImage name={repository.name} className="h-64 w-64 rounded-lg" />
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold">{repository.name}</h1>
          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText(
                `https://web-gitgate.vercel.app/repositories/${repository._id}/invite`
              )
            }
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
          >
            <span>Copy access link</span>
          </button>
          {isOwner && (
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://web-gitgate.vercel.app/repositories/${repository._id}/invite`
                )
              }
              className="inline-flex items-center justify-center rounded-md border border-red-500 bg-transparent px-4 py-2 text-sm font-medium text-red-500 shadow-sm hover:border-red-700 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 md:w-auto"
            >
              <span>Transfer ownership</span>
            </button>
          )}
        </div>
        <div className="flex flex-grow"></div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="font-bold">97/100</span>
            <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400 cursor-pointer select-none" />
          </div>
          <div className="bg-gray-200 h-2 w-64 rounded-lg">
            <div
              className="bg-green-600 h-2 rounded-lg"
              style={{width: "97%"}}
            ></div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">Tokens</h3>
          {repository.requirements.length === 0 && (
            <p className="mt-2 text-gray-300">No token requirement!</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-2 mt-2 gap-4">
            {repository.requirements.map((requirement: any) => {
              if (requirement.type === "erc-20") {
                return (
                  <Link
                    href={`https://mumbai.polygonscan.com/token/${requirement.address}`}
                    target={"_blank"}
                  >
                    <div className="bg-white transition-transform hover:scale-105 px-4 py-2 rounded-lg text-black select-none cursor-pointer flex items-center justify-center">
                      <span className="text-xs">
                        {requirement.amount} {shortenHex(requirement.address)} -{" "}
                        {requirement.type.toUpperCase()}
                      </span>
                    </div>
                  </Link>
                );
              }
              return (
                <Link
                  href={`https://mumbai.polygonscan.com/token/${requirement.address}`}
                  target={"_blank"}
                >
                  <div className="bg-white transition-transform hover:scale-105 px-4 py-2 rounded-lg text-black select-none cursor-pointer flex items-center justify-center">
                    <span className="text-xs">
                      {shortenHex(requirement.address)} -{" "}
                      {requirement.type.toUpperCase()}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">Blacklist</h3>
          {repository.blacklistedAddresses.filter(
            (address: string) => address !== ""
          ).length === 0 && (
            <p className="mt-2 text-gray-300">No blacklisted address!</p>
          )}
          <div className="grid grid-cols-1 mt-2 gap-4">
            {repository.blacklistedAddresses
              .filter((address: string) => address !== "")
              .map((address: string) => {
                return (
                  <span
                    onClick={() => push(`/profile/${address}`)}
                    className="text-xs bg-white transition-transform hover:scale-105 px-4 py-2 rounded-lg text-black select-none cursor-pointer flex items-center justify-center"
                  >
                    {shortenHex(address, 5)}
                  </span>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">Members</h3>
          <div className="grid grid-cols-1 mt-2 gap-4">
            {repository.memberAddresses.map((address: string) => {
              return (
                <span
                  onClick={() => push(`/profile/${address}`)}
                  className="bg-white text-xs transition-transform hover:scale-105 px-4 py-2 rounded-lg text-black select-none cursor-pointer flex items-center justify-center"
                >
                  {shortenHex(address, 8)}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
*/
