"use client";

import {useConnectModal, useAccount, useSignMessage} from "@web3modal/react";
import {} from "@web3modal/ethereum";
import {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";
import SearchModal from "./searchModal";
import {isFlask, shortenHex} from "../utils";

export default function Navbar() {
  const {isOpen, open} = useConnectModal();
  const {account, isReady} = useAccount();
  const [showSearch, setShowSearch] = useState(false);
  const {signMessage} = useSignMessage({message: ""});
  const {push} = useRouter();
  const [changeColor, setChangeColor] = useState(false);

  const connectWallet = () => {
    if (!isOpen) open();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onscroll = (event) => {
        if (window.scrollY > 10) {
          setChangeColor(true);
        } else if (window.scrollY < 10) {
          setChangeColor(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      signUp();
    }
  }, [isReady]);

  const signUp = async () => {
    try {
      if (typeof window !== undefined && !localStorage.getItem('gitgate_token')) {
        const isNewUser = await registerGitgateToken();
        if (isNewUser) push(`/connect/${account.address}`);
      } else {
        try {
          const meRes = await axios.get(
            "/api/users/me",
            { headers: { "Authorization": `Bearer ${localStorage.getItem('gitgate_token')}`}}
          );
          if (meRes.status === 403) throw new Error();
          if (meRes.data.address.toLowerCase() !== account.address.toLowerCase()) {
            localStorage.removeItem('gitgate_token');
            const isNewUser = await registerGitgateToken();
            if (isNewUser) push(`/connect/${account.address}`);
          }
        } catch (error) {
          const isNewUser = await registerGitgateToken();
          if (isNewUser) push(`/connect/${account.address}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const registerGitgateToken = async (): Promise<boolean> => {
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

    const hasFlask = await isFlask();
    localStorage.setItem('gitgate_token', token);
    return isNewUser;
  }

  return (
    <div className={`fixed top-0 left-0 w-full py-4 px-8 transition-colors ${!changeColor ? 'bg-transparent' : 'bg-black'} z-30`}>
      <div className="flex justify-between items-center">
        <div className="flex items-end space-x-8">
          <Link href={"/"}>
            <h4 className="font-bold text-2xl cursor-pointer">GitGate</h4>
          </Link>
          <div className="flex space-x-4 items-center mb-1 md:mb-0">
            <h5
              className="text-sm md:text-lg cursor-pointer hover:underline"
              onClick={() => setShowSearch(true)}
            >
              Search
            </h5>
            <h5
              className="text-sm md:text-lg cursor-pointer hover:underline"
              onClick={() => setShowSearch(true)}
            >
              Docs
            </h5>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
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
      </div>
      <SearchModal open={showSearch} setOpen={setShowSearch} />
    </div>
  );
}
