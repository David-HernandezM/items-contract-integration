"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <Link
          href={`user/${session.user.id}`}
          className="text-sky-600"
        >
          {
            Object.keys(session.user).includes('googleName') 
            ? session.user.googleName
            : session.user.name
          }
        </Link>
        <Link
          href={"/api/auth/signout"}
          className="flex gap-4 ml-auto text-red-600"
        >
            Sign Out
        </Link>
      </div>
);

  return (
    <div className="flex gap-4 ml-auto items-center">
      <Link
        href={"/api/auth/signin"}
        className="flex gap-4 ml-auto text-blue-600"
      >
        Sign In
      </Link>
      <Link
        href={"/signup"}
        className="flex gap-4 ml-auto bg-blue-500 text-white p-2 rounded"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default SignInButton;



