"use client";

import "./globals.css";
import {Space_Grotesk} from "@next/font/google";
import {chains, providers} from "@web3modal/ethereum";
import {Web3Modal} from "@web3modal/react";
import Navbar from "../components/navbar";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import NextNProgress from "nextjs-progressbar";

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID)
  throw new Error(
    "You need to provide NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable"
  );

const walletConnectConfig: any = {
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  theme: "dark",
  accentColor: "magenta",
  ethereum: {
    appName: "GitGate",
    chains: [chains.polygonMumbai],
    providers: [
      providers.walletConnectProvider({
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
      }),
    ],
  },
};

const spaceGrotesk = Space_Grotesk({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <head>
        <title>GitGate</title>
        <meta
          name="description"
          content="Welcome to GitGate, the first tool to enhance your Github repo with NFT-gating and token-gating systems."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-screen">
        <div className="h-full">
          <NextNProgress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <Navbar />
          {children}
          <ToastContainer />
          <Web3Modal config={walletConnectConfig} />
        </div>
      </body>
    </html>
  );
}
