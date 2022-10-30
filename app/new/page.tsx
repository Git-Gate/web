"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {
  ClipboardIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import {Combobox} from "@headlessui/react";
import {toast} from "react-toastify";
import {useAccount, useSignMessage} from "@web3modal/react";
import {ethers} from "ethers";
import NewRequirementSlide from "../../components/newRequirementSlide";
import RequirementsTable from "../../components/requirementsTable";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NewRepository() {
  const {signMessage} = useSignMessage({message: ""});
  const {account, isReady} = useAccount();
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);
  const [blacklistedAddresses, setBlacklistedAddresses] = useState("");
  const [tokenizeLoading, setTokenizeLoading] = useState(false);
  const [tokenGroups, setTokenGroups] = useState<any[]>([
    {
      type: "ERC-20",
      tokens: [],
    },
    {
      type: "ERC-721",
      tokens: [],
    },
    {
      type: "ERC-1155",
      tokens: [],
    },
  ]);
  const {push} = useRouter();

  const filteredRepos =
    query === ""
      ? repos
      : repos.filter((repo) => {
          return repo.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = async () => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("gitgate_token")
    ) {
      const reposRes = await axios.get("/api/github/repositories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("gitgate_token")}`,
        },
      });
      setRepos(reposRes.data);
    }
  };

  const addToken = (requirement: any) => {
    setTokenGroups(
      tokenGroups.map((tokenGroup: any) => {
        if (tokenGroup.type === requirement.type) {
          tokenGroup.tokens = [...tokenGroup.tokens, requirement];
        }
        return tokenGroup;
      })
    );
  };

  const removeToken = (type: string, idx: number) => {
    setTokenGroups(
      tokenGroups.map((tokenGroup: any) => {
        if (tokenGroup.type === type) {
          tokenGroup.tokens = tokenGroup.tokens.filter(
            (_: any, tIndex: number) => tIndex !== idx
          );
          return tokenGroup;
        }
        return tokenGroup;
      })
    );
  };

  const createRepo = async () => {
    if (tokenizeLoading) return;
    // TODO: change this
    setTokenizeLoading(true);
    const requirements = [];
    for (let i = 0; i < tokenGroups.length; i++) {
      for (let j = 0; j < tokenGroups[i].tokens.length; j++) {
        requirements.push({
          type: tokenGroups[i].type.toLowerCase(),
          address: tokenGroups[i].tokens[j].address,
          amount: parseInt(tokenGroups[i].tokens[j].amount) || 1,
          ids:
            tokenGroups[i].tokens[j].ids
              .filter(String)
              .map((id: string) => parseInt(id)) || [],
        });
      }
    }
    console.log(requirements);
    const apiData: any = {
      repositoryId: selectedRepo.id,
      repositoryName: selectedRepo.name,
      repositoryOwner: selectedRepo.owner,
      requirements,
      blacklistedAddresses: blacklistedAddresses
        .split(",")
        .filter((address: string) => address !== ""),
      cid: "",
      messageHash: "",
      signedMessage: "",
    };
    try {
      console.log(
        `${selectedRepo.id}_${ethers.utils.getAddress(account.address)}`
      );
      const hashedMessage = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(
          `${selectedRepo.id}_${ethers.utils.getAddress(account.address)}`
        )
      );
      const signedMessage = await signMessage({
        message: ethers.utils.arrayify(hashedMessage),
      });
      apiData.messageHash = hashedMessage;
      apiData.signedMessage = signedMessage;
      const newRepo = await axios.post(`/api/repositories`, apiData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("gitgate_token")}`,
          "Content-Type": "application/json",
        },
      });
      setSelectedRepo(newRepo.data);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      toast.error("Error while creating repo.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setTokenizeLoading(false);
    }
  };

  if (success) {
    return (
      <div className="h-screen max-w-3xl mx-auto flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl md:text-5xl text-center font-extrabold z-20">
          <p>🎉</p>
          <p className="mt-4">
            Congratulations! You repository is now tokenized!
          </p>
        </h1>
        <h2 className="text-xl text-center text-gray-300 max-w-2xl z-20">
          Share this link to people that fulfill your token requirements.
        </h2>
        <div className="mt-1 flex rounded-md shadow-sm w-full">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              type="text"
              name="text"
              id="url"
              className="block w-full rounded-none rounded-l-md border-gray-300 pl-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={`https://web-gitgate.vercel.app/invite/repo?repoId=${selectedRepo._id}`}
            />
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            onClick={() =>
              navigator.clipboard.writeText(
                `https://web-gitgate.vercel.app/invite/repo?repoId=${selectedRepo._id}`
              )
            }
          >
            <ClipboardIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Copy</span>
          </button>
        </div>
        <p
          className="text-gray-400 underline cursor-pointer select-none"
          onClick={() => push("/")}
        >
          Back to homepage
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen w-full">
        <div className="h-2/5 bg-indigo-500 pt-32 px-8">
          <h1 className="text-4xl font-black">Tokenize repository</h1>
          <h2 className="text-2xl text-gray-200">
            Select one repository among the ones that you own
          </h2>
          <Combobox as="div" value={selectedRepo} onChange={setSelectedRepo}>
            <div className="relative mt-4 w-full md:w-1/3 text-black">
              <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(repo: any) => repo?.name}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {filteredRepos.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredRepos.map((repo) => (
                    <Combobox.Option
                      key={repo.id}
                      value={repo}
                      className={({active}) =>
                        classNames(
                          "relative cursor-default select-none py-2 pl-8 pr-4",
                          active ? "bg-indigo-600 text-white" : "text-gray-900"
                        )
                      }
                    >
                      {({active, selected}) => (
                        <>
                          <span
                            className={classNames(
                              "block truncate",
                              selected && "font-semibold"
                            )}
                          >
                            {repo.name}
                          </span>
                          {selected && (
                            <span
                              className={classNames(
                                "absolute inset-y-0 left-0 flex items-center pl-1.5",
                                active ? "text-white" : "text-indigo-600"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>
        {selectedRepo && (
          <div className="py-8">
            <RequirementsTable
              onClick={() => setOpen(true)}
              tokenGroups={tokenGroups}
              removeToken={(type: string, idx: number) =>
                removeToken(type, idx)
              }
            />
            <div className="p-8">
              <div className="md:flex md:items-center">
                <div className="md:flex-auto">
                  <h2 className="text-2xl font-semibold text-white">
                    Blacklisted addresses
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    Comma separated value format.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-16 md:flex-none">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
                  >
                    Upload CSV
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <textarea
                  id="blacklistedAddresses"
                  name="blacklistedAddresses"
                  rows={5}
                  className="block w-full md:w-2/3 rounded-md text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(event) =>
                    setBlacklistedAddresses(event.target.value)
                  }
                  value={blacklistedAddresses}
                />
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-8 md:flex-none flex items-center justify-center md:justify-start">
              <button
                onClick={() => createRepo()}
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
              >
                {tokenizeLoading ? (
                  <span className="animate-pulse">Tokenizing...</span>
                ) : (
                  <>Tokenize {selectedRepo.name}</>
                )}
              </button>
            </div>
          </div>
        )}
        <NewRequirementSlide
          open={open}
          setOpen={setOpen}
          submitRequirement={(requirement) => addToken(requirement)}
        />
      </div>
    </>
  );
}
