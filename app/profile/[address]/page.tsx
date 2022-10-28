'use client';

import Image from 'next/image';
import { shortenHex } from '../../../utils';

export default function Profile({ params }: { params: { address: string }}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col space-y-4 py-36">
                <img alt="User profile" className='rounded-full' src={"https://images.unsplash.com/photo-1586325194227-7625ed95172b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300&q=80"} />
                <h3 className='font-bold text-2xl'>{ shortenHex(params.address, 8) }</h3>
            </div>
            <div className="flex flex-col md:col-span-2">

            </div>
        </div>
    )
}