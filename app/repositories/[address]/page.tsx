"use client";

import {
  ArrowPathRoundedSquareIcon,
  ClipboardDocumentIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {useAccount} from "@web3modal/react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import RepoImage from "../../../components/repoImage";

export default function RepoPage({params}: {params: any}) {
  const {account} = useAccount();
  const [isOwner, setIsOwner] = useState(false);
  const [repository, setRepository] = useState<any>(null);
  const [error, setError] = useState(false);
  const [githubData, setGithubData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
        <div className="flex flex-col items-center space-y-4 py-36">
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
                  `https://web-gitgate.vercel.app/repositories/${repository._id}/invite`
                )
              }
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:scale-105 transition-transform md:w-full"
            >
              <ClipboardDocumentIcon className="h-4 mr-2" />
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
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 md:w-full"
              >
                <ArrowPathRoundedSquareIcon className="h-4 mr-2" />
                <span>Transfer ownership</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full ml-auto md:w-8/12">
        <div className="flex flex-col items-center h-screen bg-black py-24 md:py-36 px-8 text-black"></div>
      </div>
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
