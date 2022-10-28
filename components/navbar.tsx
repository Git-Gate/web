"use client";

import {useConnectModal, useAccount, useSignMessage} from "@web3modal/react";
import {} from "@web3modal/ethereum";
import {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";
import SearchModal from "./searchModal";
import {shortenHex} from "../utils";

export default function Navbar() {
  const {isOpen, open} = useConnectModal();
  const {account, isReady} = useAccount();
  const [showSearch, setShowSearch] = useState(false);
  const {signMessage} = useSignMessage({message: ""});
  const {push} = useRouter();

  const connectWallet = () => {
    if (!isOpen) open();
  };

  useEffect(() => {
    if (isReady) {
      signUp();
    }
  }, [isReady]);

  const signUp = async () => {
    try {
      const nonceRes = await axios.get("/api/auth/nonce");
      const {nonce, message} = nonceRes.data;
      const signature = await signMessage({message});
      const signUpRes = await axios.post(
        "/api/auth/signup",
        {
          address: account.address,
          signature,
          nonce,
        },
        {headers: {"Content-Type": "application/json"}}
      );
      const {token, isNewUser} = signUpRes.data;
      if (isNewUser) {
        push(`/connect/${account.address}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full py-4 px-8 bg-accent bg-transparent z-20">
      <div className="flex justify-between items-center">
        <div className="flex items-end space-x-8">
          <Link href={"/"}>
            <h4 className="font-bold text-2xl cursor-pointer">GitGate</h4>
          </Link>
          <div className="flex space-x-4 items-center mb-0.5">
            <h5
              className="text-md cursor-pointer hover:underline"
              onClick={() => setShowSearch(true)}
            >
              Search
            </h5>
          </div>
        </div>
        <div className="hidden space-x-4 items-center md:flex">
          {isReady && account.address ? (
            <Link href={`/profile/${account.address}`}>
              <div className="bg-white text-black select-none px-4 py-2 cursor-pointer rounded-md transition-transform hover:scale-105">
                {shortenHex(account.address)}
              </div>
            </Link>
          ) : (
            <div
              className="bg-white text-black select-none px-4 py-2 cursor-pointer rounded-md transition-transform hover:scale-105"
              onClick={() => connectWallet()}
            >
              {isOpen ? (
                <span className="motion-safe:animate-pulse">Connecting</span>
              ) : (
                "Connect"
              )}
            </div>
          )}
        </div>
        <div className="flex md:hidden"></div>
      </div>
      <SearchModal open={showSearch} setOpen={setShowSearch} />
    </div>
  );
}
