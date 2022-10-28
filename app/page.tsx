"use client";

import {motion, Variants} from "framer-motion";

export default function Home() {
  const cardVariants = (delay: number): Variants => {
    return {
      offscreen: {
        y: 300,
        opacity: 0,
      },
      onscreen: {
        y: 50,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
          delay,
        },
      },
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero */}
      <motion.div
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 1}}
        viewport={{once: true}}
        className="max-w-4xl flex flex-col items-center justify-center py-16 space-y-8 h-screen px-4 z-20 relative"
      >
        <motion.img
          initial={{opacity: 0}}
          animate={{opacity: 0.4}}
          transition={{duration: 1, delay: 0.5}}
          className="absolute z-10 skew-y-3 motion-safe:animate-wiggle"
          src="/ethereum.png"
          viewport={{once: true}}
        />
        <h1 className="text-6xl text-center font-extrabold z-20">
          <p>The home for</p>
          <p>decentralized repo access</p>
        </h1>
        <h2 className="text-2xl text-center text-gray-300 max-w-2xl z-20">
          Manage your Github repositories and add NFT/token access gates for
          your open source projects.
        </h2>
        <a
          href="#explore"
          className="z-20 px-8 py-2 select-none text-lg bg-white text-black rounded-md cursor-pointer transition-transform hover:scale-105"
        >
          Start exploring
        </a>
      </motion.div>
    </div>
  );
}
