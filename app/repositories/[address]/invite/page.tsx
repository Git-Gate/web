"use client";

import {useAccount, useConnectModal} from "@web3modal/react";
import axios from "axios";
import {useEffect, useState} from "react";
import LoginGithub from "react-login-github";
import {toast} from "react-toastify";

export default function InviteRepoPage() {
  const {account, isReady} = useAccount();
  const [step, setStep] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const {isOpen, open} = useConnectModal();

  useEffect(() => {
    if (account.address && step === 0) {
      setStep(1);
    }
  }, [account]);

  const checkEligibility = async () => {
    setStep(2);
    setSuccess(Math.random() > 0.5);
  };

  const onGithubLoginSuccess = async (response: any) => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("gitgate_token")
    ) {
      const {code} = response;
      const codeRes = await axios.post(
        "/api/auth/github",
        {code},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("gitgate_token")}`,
          },
        }
      );
      if (codeRes.status === 200) {
        toast.success("Connection successful!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setStep(3);
        setSuccess(true);
      }
    }
  };

  const getBody = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg md:text-xl text-center text-gray-300 max-w-2xl z-20">
              Connect your wallet to check if you are eligible for an invite
            </h2>
            <button
              onClick={() => {
                open();
              }}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isOpen ? (
                <span className="animate-pulse">Connecting...</span>
              ) : (
                "Connect wallet"
              )}
            </button>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg md:text-xl text-center text-gray-300 max-w-2xl z-20">
              Check if you are eligible for an invite
            </h2>
            <button
              onClick={() => checkEligibility()}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Check eligiblity
            </button>
          </div>
        );
      case 2:
        if (!success) {
          return (
            <h2 className="text-lg md:text-xl text-center text-gray-300 max-w-2xl z-20">
              Your wallet does not satistfy the token requirements set by the
              repo owner
            </h2>
          );
        }
        return (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg md:text-xl text-center text-gray-300 max-w-2xl z-20">
              Connect your GitHub account to receive an invite by the repo owner
            </h2>
            <LoginGithub
              onSuccess={(response: any) => onGithubLoginSuccess(response)}
              onError={(response: any) => console.error(response)}
              clientId="3cab64e37e3e051e028a"
              scope="read:user"
            >
              <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Connect Github
              </button>
            </LoginGithub>
          </div>
        );
      default:
        return (
          <h2 className="text-lg md:text-xl text-center text-gray-300 max-w-2xl z-20">
            🎉 Yay! You did it! 🎉
          </h2>
        );
    }
  };

  return (
    <div className="h-screen max-w-3xl mx-auto flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl md:text-5xl text-center font-extrabold z-20">
        <p>🦄</p>
        <p className="mt-4">
          Get access to <span className="underline">urbeEth</span> repo.
        </p>
      </h1>
      <div className="px-8 md:px-0">{getBody()}</div>
    </div>
  );
}
