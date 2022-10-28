'use client';

import { Listbox } from "@headlessui/react";
import { useState } from "react"
import RepoModal from "../../components/repoModal";

const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
  ]

export default function NewRepository() {
    const [selectedRepo, setSelectedRepo] = useState<any>(null);
    const [open, setOpen] = useState(false);

    return (
        <>
        <div className="h-screen w-full">
            <div className="h-2/5 bg-indigo-500 pt-36 px-8">
                <h1 className="text-4xl font-black">Tokenize repository</h1>
                <h2 className="text-2xl text-gray-200">Select one repository, among the ones that you own</h2>
                <div className="px-4 bg-white text-black py-2 rounded mt-4 w-64 cursor-pointer text-center select-none transition-transform hover:scale-105" onClick={() => setOpen(true)}>
                    {selectedRepo !== null ? selectedRepo.name : 'Choose repo'}
                </div>
            </div>
        </div>
        <RepoModal open={open} setOpen={setOpen} selectedRepo={selectedRepo} setSelectedRepo={setSelectedRepo} />
        </>
    )
}