'use client';

import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { useAccount } from '@web3modal/react';
import Image from 'next/image';
import { useState } from 'react';
import { shortenHex } from '../../../utils';

export default function Connect({ params }: { params: { address: string }}) {
    const { account, isReady } = useAccount();
    const [open, setOpen] = useState(false);

    if (!isReady) {
        return (
            <div className='h-screen flex flex-col items-center justify-center'>
                <h1 className='text-2xl animate-pulse'>Loading...</h1>
            </div>
        )
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center space-y-8'>
            <div className='flex flex-col items-center justify-center space-y-4'>
                <h1 className='text-3xl'>Welcome <span className='font-bold'>{ shortenHex(account.address) }</span>! 🎉</h1>
                <h3 className='max-w-md text-md text-center text-gray-300'>To complete the onboarding process please connect your Github account.</h3>
                <div className='bg-blue-500 text-white select-none px-4 py-2 cursor-pointer rounded-md transition-transform hover:scale-105'>
                    Connect Github
                </div>
            </div>
            <div className='rounded-lg bg-gray-900 p-6 flex space-x-4'>
                <QuestionMarkCircleIcon color='#fff' height={24} width={24} />
                <div className='w-96'>
                    <h4 className='font-bold cursor-pointer' onClick={() => setOpen(!open)}>Why do I need to connect a Github account?</h4>
                    { open && <p>GitGate has a custom GitHub app that needs to be attached to the repository you wish to tokenize.</p> }
                    { open && <p>The GitHub app is needed to automatically send invites to users who are eligible for an invite in your repository.</p> }
                </div>
            </div>
        </div>
    )
}