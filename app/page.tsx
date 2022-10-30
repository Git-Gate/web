"use client";

import {motion, Variants} from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero */}
      <motion.div
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 1}}
        viewport={{once: true}}
        className="max-w-5xl flex flex-col items-center justify-center py-16 space-y-8 h-screen px-8 md:px-4 z-20 relative"
      >
        <motion.img
          initial={{opacity: 0}}
          animate={{opacity: 0.4}}
          transition={{duration: 1, delay: 0.5}}
          className="absolute z-10 w-3/4 md:w-full skew-y-3 motion-safe:animate-wiggle"
          src="/ethereum.png"
          viewport={{once: true}}
        />
        <h1 className="text-4xl md:text-6xl text-center font-extrabold z-20">
          <p>Unlock token-gating & access controls for GitHub repositories</p>
        </h1>
        <h2 className="text-xl md:text-4xl text-center text-gray-300 max-w-3xl z-20">
          Easily embed a DAO within your repository through Soulbound membership
          tokens.
        </h2>
        <a
          href="#explore"
          className="z-20 px-8 py-2 select-none text-md md:text-lg bg-white text-black rounded-md cursor-pointer transition-transform hover:scale-105"
        >
          Start exploring
        </a>
      </motion.div>
      <div
        id="explore"
        className="bg-white text-black flex flex-col w-full items-center justify-center py-16 space-y-8 min-h-screen px-8 md:px-4 z-20 relative"
      >
        <div className="max-w-5xl flex flex-col md:flex-row items-center justify-center">
          <motion.img
            className="w-1/2 md:w-2/5"
            src="/contract.png"
            viewport={{once: true}}
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-4xl md:text-5xl text-center font-extrabold z-20">
              On-chain requirements verification
            </h1>
            <h2 className="text-xl md:text-2xl text-center text-gray-700 max-w-2xl z-20">
              Define requirements to access your repositories and invite
              collaborators based on on-chain requirements.
            </h2>
            <Link
              href="https://seasoned-eocursor-e4d.notion.site/Registry-d7df5f6567804e1db1bdf173f28720bf"
              target={"_blank"}
            >
              <div className="z-20 mt-4 px-8 py-2 select-none text-md md:text-lg bg-black text-white rounded-md cursor-pointer transition-transform hover:scale-105">
                View the docs
              </div>
            </Link>
            <a
              href="#reward"
              className="z-20 mt-4 px-8 py-2 select-none text-xs md:text-sm bg-white text-black rounded-md cursor-pointer transition-transform hover:scale-105"
            >
              But there's more..
            </a>
          </div>
        </div>
      </div>
      <div
        id="reward"
        className="bg-black text-white flex flex-col w-full items-center justify-center py-16 space-y-8 h-screen px-8 md:px-4 z-20 relative"
      >
        <div className="max-w-5xl flex flex-col md:flex-row-reverse items-center justify-center">
          <motion.img
            className="w-1/2 md:w-2/5"
            src="/soulbound.png"
            viewport={{once: true}}
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-4xl md:text-5xl text-center font-extrabold z-20">
              Reward your devs
            </h1>
            <h2 className="text-xl md:text-2xl text-center text-gray-300 max-w-2xl z-20">
              A Soulbound ERC721Votes token for your contributors to explore new
              governance horizons.
            </h2>
            <Link
              href="https://seasoned-eocursor-e4d.notion.site/POGM-token-c77e88a3f448448281732836f8738edd"
              target={"_blank"}
            >
              <div className="z-20 mt-4 px-8 py-2 select-none text-md md:text-lg bg-white text-black rounded-md cursor-pointer transition-transform hover:scale-105">
                View the docs
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        id="footer"
        className="bg-black text-white text-center flex flex-col w-full items-center justify-center py-8 px-8 md:px-4 z-20 relative"
      >
        <p>
          <span className="font-bold">GitGate</span> - Made with ❤️ from 🇮🇹
          @ETHLisbon Hackaton.
        </p>
      </div>
    </div>
  );
}
