"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import config from "@/config";

interface ButtonSigninProps {
  text?: string;
  extraStyle?: string;
}

export default function ButtonSignin({ text = "Sign in", extraStyle = "" }: ButtonSigninProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  // If user is logged in, show the dropdown menu
  if (session?.user) {
    return (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt={session.user.name || "User avatar"}
              src={
                session.user.image ||
                `https://ui-avatars.com/api/?name=${session.user.name}`
              }
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href="/dashboard" className="justify-between">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/manuals" className="justify-between">
              Manuals
            </Link>
          </li>
          <li>
            <button onClick={() => signOut()}>Logout</button>
          </li>
        </ul>
      </div>
    );
  }

  // If user is not logged in, show the login button
  return (
    <Link
      href={config.auth.loginUrl}
      className={`btn ${
        pathname === config.auth.loginUrl ? "btn-primary" : "btn-ghost"
      } ${extraStyle}`}
    >
      {text}
    </Link>
  );
}