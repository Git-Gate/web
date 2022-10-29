"use client";

import {useRouter} from "next/navigation";

export default function UserNotFound() {
  const {push} = useRouter();

  return (
    <div className="h-screen max-w-3xl mx-auto flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl md:text-5xl text-center font-extrabold z-20">
        <p>🤨</p>
        <p className="mt-4">The user you're looking for does not exist.</p>
      </h1>
      <div className="px-8 md:px-0">
        <p
          className="text-gray-400 underline cursor-pointer select-none"
          onClick={() => push("/")}
        >
          Back to homepage
        </p>
      </div>
    </div>
  );
}
