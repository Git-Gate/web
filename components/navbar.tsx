'use client'

import { Web3Button, useConnectModal, useAccount } from '@web3modal/react'
import { } from '@web3modal/ethereum'
import { useState } from 'react'
import { shortenHex } from '../utils'
import Link from 'next/link'
import SearchModal from './searchModal'

export default function Navbar() {
    const { isOpen, open, close } = useConnectModal()
    const { account, isReady } = useAccount()
    const [showSearch, setShowSearch] = useState(false)

    const connectWallet = () => {
        if (!isOpen) open();
    }

    return (
        <div className="absolute top-0 left-0 w-full py-4 px-8 bg-accent bg-transparent z-20">
            <div className="flex justify-between items-center">
                <div className='flex items-end space-x-8'>
                    <Link href={"/"}>
                        <h4 className='font-bold text-2xl cursor-pointer'>GitGate</h4>
                    </Link>
                    <div className='flex space-x-4 items-center mb-0.5'>
                        <h5 className='text-md cursor-pointer hover:underline' onClick={() => setShowSearch(true)}>Search</h5>
                    </div>
                </div>
                <div className='hidden space-x-4 items-center md:flex'>
                    {
                        isReady ? 
                        <Link href={`/connect/${account.address}`}>
                            <div className='bg-white text-black select-none px-4 py-2 cursor-pointer rounded-md transition-transform hover:scale-105'>
                                { shortenHex(account.address) }
                            </div>
                        </Link>
                        : 
                        <div className='bg-white text-black select-none px-4 py-2 cursor-pointer rounded-md transition-transform hover:scale-105' onClick={() => connectWallet()}>
                            { isOpen ? <span className='motion-safe:animate-pulse'>Connecting</span> : 'Connect'}
                        </div>
                    }
                </div>
                <div className='flex md:hidden'>
                    
                </div>
            </div>
            <SearchModal open={showSearch} setOpen={setShowSearch} />
        </div>
    )
}