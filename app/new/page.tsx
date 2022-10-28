'use client';

import { useEffect, useState } from "react"
import axios from 'axios';
import RequirementsTable from "../../components/requirementsTable";

export default function NewRepository() {
    const [selectedRepo, setSelectedRepo] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [repos, setRepos] = useState<any[]>([]);

    console.log(selectedRepo);

    useEffect(() => {
        getRepos();
    }, []);

    const getRepos = async () => {
        if (typeof window !== 'undefined' && localStorage.getItem('gitgate_token')) {
            const reposRes = await axios.get('/api/github/repositories', { headers: { 'Authorization': `Bearer ${localStorage.getItem('gitgate_token')}`}})
            setRepos(reposRes.data);
        }
    }

    return (
        <>
        <div className="h-screen w-full">
            <div className="h-2/5 bg-indigo-500 pt-36 px-8">
                <h1 className="text-4xl font-black">Tokenize repository</h1>
                <h2 className="text-2xl text-gray-200">Select one repository, among the ones that you own</h2>
                <div className="mt-2">
                    <select
                        id="repo"
                        name="repo"
                        className="mt-1 block w-72 rounded-md bg-white text-black border border-gray-300 py-2 px-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        
                        onChange={(event) => setSelectedRepo(event.target.value)}
                    >
                        <option value={""}></option>
                        {
                            repos.map((repo) => {
                                return <option key={repo.id} value={JSON.stringify(repo)}>{repo.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            {
                selectedRepo && <div className="py-8">
                    <RequirementsTable />
                    <div className="p-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                            <h2 className="text-2xl font-semibold text-white">Blacklisted addresses</h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Comma separated value format.
                            </p>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            >
                                Upload CSV
                            </button>
                            </div>
                        </div>
                        <textarea
                            rows={5}
                            name="comment"
                            id="comment"
                            className="block w-full md:w-1/2 resize-none border-0 py-3 focus:ring-0 sm:text-sm mt-4 px-2"
                            placeholder="0x000000..."
                            defaultValue={''}
                        />

                    </div>
                </div>
            }
        </div>
        </>
    )
}