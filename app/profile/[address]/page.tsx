"use client";

import { CogIcon, PlusIcon, UserGroupIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { shortenHex } from '../../../utils';

const repositories = [
    {
        name: 'todo-list-app',
        description: "The classic todo list app, really useful to learn React",
        role: 'owner',
        members: 15
    },
    {
        name: 'todo-list-app',
        description: "The classic todo list app, really useful to learn React",
        role: 'member',
        members: 8
    },
    {
        name: 'todo-list-app',
        description: "The classic todo list app, really useful to learn React",
        role: 'owner',
        members: 10
    }
]
// const repositories: any[] = [];

export default function Profile({ params }: { params: { address: string }}) {
    const { push } = useRouter();

    return (
        <div className="relative">
            <div className="relative inset-0 w-full min-h-screen md:fixed md:w-4/12">

            <div className="flex flex-col items-center space-y-4 py-36">
                <img alt="User profile" className='rounded-full h-48 w-48' src={"https://images.unsplash.com/photo-1586325194227-7625ed95172b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300&q=80"} />
                <h3 className='font-bold text-2xl'>{ shortenHex(params.address, 8) }</h3>
                <p className='max-w-sm text-center text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ab qui. Libero, aspernatur! Fugit, libero molestiae? Accusantium tempore repudiandae perspiciatis tenetur cupiditate.</p>
                <div className='flex space-x-4 items-center bg-white hover:bg-gray-200 text-black text-sm font-semibold select-none px-4 py-2 cursor-pointer rounded-md'>
                    <CogIcon height={24} width={24} color={'#000000'} />
                    <span>Edit profile</span>
                </div>
            </div>
            </div>
            <div className="w-full ml-auto md:w-8/12">
                <div className="flex flex-col h-screen bg-indigo-500 py-36 px-8 text-black">
                    <h2 className="mb-5 text-4xl font-bold">Your tokenized repositories</h2>
                    <div className='flex justify-between space-x-4'>
                        <input 
                            type={"text"} 
                            className="bg-white text-black select-none px-4 py-2 rounded-md ring-black focus:ring-2 w-full md:w-1/3 border-black border-2"
                            placeholder='Search...' 
                        />
                        <div className='flex space-x-4 items-center bg-black text-sm font-medium shadow-sm text-white select-none px-4 py-2 cursor-pointer rounded-md transition-transform hover:scale-105' onClick={() => push('/new')}>
                            <PlusIcon height={24} width={24} color={'#ffffff'} />
                            <span>New</span>
                        </div>
                    </div>
                    <hr className='my-4' />
                    {
                        repositories.length === 0 &&     
                        <div className="text-center mt-8 mx-auto">
                            <svg
                            className="mx-auto h-12 w-12 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                            >
                            <path
                                vectorEffect="non-scaling-stroke"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                            </svg>
                            <h3 className="mt-2 text-md font-medium text-white">No repositories</h3>
                            <p className="mt-1 text-sm text-gray-200">Get started by tokenizing a Github repository.</p>
                            <div className="mt-6 w-44 mx-auto">
                                <div className='flex space-x-4 items-center bg-black text-sm font-medium shadow-sm text-white select-none px-4 py-2 cursor-pointer rounded-md transition-transform hover:scale-105' onClick={() => push('/new')}>
                                    <PlusIcon height={24} width={24} color={'#ffffff'} />
                                    <span>New repository</span>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        repositories.map((repository) => {
                            return <>
                                    <div className='flex flex-col text-white space-y-4'>
                                    <div className='flex flex-col space-y-2'>
                                        <h3 className='font-bold text-2xl cursor-pointer hover:text-gray-300 hover:underline'>{ repository.name }</h3>
                                        <h4 className='text-lg text-gray-300'>{ repository.description }</h4>
                                    </div>
                                    <div className='flex space-x-2'>
                                        <span className="inline-flex space-x-2 items-center cursor-pointer select-none rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                                            <UserGroupIcon className='h-4 w-4 text-black' />
                                            <span>{repository.members}</span>
                                        </span>
                                        <span className="inline-flex items-center cursor-pointer select-none rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                                            { repository.role }
                                        </span>
                                    </div>
                                </div>
                                <hr className='my-4' />
                            </>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
