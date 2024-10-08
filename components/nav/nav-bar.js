'use client';

import Login from "../auth/login-dialog";
import useCurrentUser from "@/hooks/use-current-user";
import UserButton from "./user-button";
import Link from "next/link";

export default function NavigationBar() {
  const user = useCurrentUser();

  return (
    <div className="flex py-2 px-4 items-center bg-indigo-950 text-white">
      <Link href="/create" className="flex-grow items-center">
        <img src="/logo/logo-white.png" alt="logo" className="w-10" />
      </Link>
      <div className="flex gap-10 items-center ">
        {!user && <Login />}
        {user && 
          <UserButton user={user} />
        }
      </div>
    </div>
  );
}