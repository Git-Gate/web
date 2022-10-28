'use client'

import { motion, Variants } from "framer-motion"

export default function Home() {

  const cardVariants = (delay: number): Variants => {
    return {
      offscreen: {
        y: 300,
        opacity: 0
      },
      onscreen: {
        y: 50,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
          delay,
        }
      }
    };
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      { /* Hero */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl flex flex-col items-center justify-center py-16 space-y-8 h-screen px-4 z-20 relative"
      >
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute z-10 skew-y-3"
          src="/ethereum.png" 
          viewport={{ once: true }}
        />
        <h1 className="text-6xl text-center font-extrabold z-20">
          <p>The home for</p>
          <p>decentralized repo access</p>
        </h1>
        <h2 className="text-2xl text-center text-gray-400 max-w-2xl z-20">
          Manage your Github repositories and add NFT/token access gates for your open source projects.
        </h2>
        <a href="#explore" className="z-20 px-8 py-2 select-none text-lg bg-white text-black rounded-md cursor-pointer transition-transform hover:scale-105">
          Start exploring
        </a>
      </motion.div>
      <div 
        id="explore"
        className="bg-white text-black w-full flex flex-col items-center justify-center py-16 space-y-2 h-screen px-4 z-20"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-lg text-center font-extrabold text-indigo-500"
        >
          <p>EXPLORE</p>
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl text-center font-extrabold"
        >
          <p>Token-gated repositories</p>
        </motion.h1>
        <h2 className="text-2xl text-center text-gray-400 max-w-2xl">
          Made easy for everyone.
        </h2>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
        >
          <motion.div 
            className="border border-gray-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center space-y-2 text-center" 
            variants={cardVariants(0)}
          >
            <img src="/repo.png" />
            <h4 className="text-lg font-bold">Manage your repos</h4>
            <p className="text-gray-400">View your Github repositories and decentralize them.</p>
          </motion.div>
          <motion.div className="border border-gray-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center space-y-2 text-center" variants={cardVariants(0.4)}>
            <img src="/gate.png" />
            <h4 className="text-lg font-bold">Restrict their access</h4>
            <p className="text-gray-400">Give access only to members who own specific tokens.</p>
          </motion.div>
          <motion.div className="border border-gray-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center space-y-2 text-center" variants={cardVariants(0.8)}>
            <img src="/reward.png" />
            <h4 className="text-lg font-bold">Reward your contributors</h4>
            <p className="text-gray-400">Contributors obtain soulbound tokens for their work.</p>
          </motion.div>
        </motion.div>
      </div>
      <div 
        className="bg-black text-white w-full flex flex-col items-center justify-center py-16 space-y-2 h-screen px-4 z-20"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-lg text-center font-extrabold text-indigo-500"
        >
          <p>EXPLORE</p>
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl text-center font-extrabold"
        >
          <p>Token-gated repositories</p>
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl text-center text-gray-400 max-w-2xl">
          Made easy for everyone.
        </motion.h2>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
        >
          <motion.div 
            className="border border-gray-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center space-y-2 text-center" 
            variants={cardVariants(0)}
          >
            <img src="/repo.png" />
            <h4 className="text-lg font-bold">Manage your repos</h4>
            <p className="text-gray-400">View your Github repositories and decentralize them.</p>
          </motion.div>
          <motion.div className="border border-gray-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center space-y-2 text-center" variants={cardVariants(0.4)}>
            <img src="/gate.png" />
            <h4 className="text-lg font-bold">Restrict their access</h4>
            <p className="text-gray-400">Give access only to members who own specific tokens.</p>
          </motion.div>
          <motion.div className="border border-gray-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center space-y-2 text-center" variants={cardVariants(0.8)}>
            <img src="/reward.png" />
            <h4 className="text-lg font-bold">Reward your contributors</h4>
            <p className="text-gray-400">Contributors obtain soulbound tokens for their work.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
