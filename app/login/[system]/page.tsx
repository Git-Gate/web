"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    const repoId = searchParams.get("repoId");
    if (repoId && code) {
      router.push(`/login/github?repoId=${repoId}&code=${code}`);
    } else {
      router.push(`/`);
    }
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center text-xl">
      Login successful! Redirecting...
    </div>
  );
}
