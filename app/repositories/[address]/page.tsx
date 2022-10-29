'use client';

import axios from "axios";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function RepoPage({ params }: { params: any }) {
    const [repository, setRepository] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        getRepository();
    }, []);

    const getRepository = async () => {
        setLoading(true);
        try {
            const repositoryRes = await axios.get(`/api/repositories/${params.address}`)
            setRepository(repositoryRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl animate-pulse">Loading...</h1>
            </div>
        );
    }

    if (!repository) {

    
    return (
        
        <div className="h-screen max-w-3xl mx-auto flex flex-col items-center justify-center space-y-4">
            <h1 className="text-3xl md:text-5xl text-center font-extrabold z-20">
                <p>🤨</p>
                <p className="mt-4">The repository you're looking for does not exist.</p>
            </h1>
            <div className="px-8 md:px-0">
                <p className="text-gray-400 underline cursor-pointer select-none" onClick={() => push('/')}>Back to homepage</p>
            </div>
        </div>
    )
    }

    return <div className="h-screen flex flex-col py-36 px-8">
        <div className="flex items-center">
            <h1 className="text-4xl font-bold">{ repository.name }</h1>
        </div>
    </div>
}