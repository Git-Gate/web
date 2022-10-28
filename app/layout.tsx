'use client';

import './globals.css'
import { Space_Grotesk } from '@next/font/google'
import { chains, providers } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import Navbar from '../components/navbar'

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID)
  throw new Error('You need to provide NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')

const walletConnectConfig: any = {
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'GitGate',
    chains: [
      chains.polygonMumbai,
    ],
    providers: [providers.walletConnectProvider({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID })]
  }
};

const spaceGrotesk = Space_Grotesk({ subsets: [ "latin" ]});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={spaceGrotesk.className}>
      <head>
        <title>GitGate</title>
        <meta name="description" content="Welcome to GitGate, the first tool to enhance your Github repo with NFT-gating and token-gating systems." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className='h-screen'>
        <div className='h-full'>
          <Navbar />
          {children}
          <Web3Modal config={walletConnectConfig} />
        </div>
      </body>
    </html>
  )
}
