'use client';

import Login from "../auth/login-dialog";
import useCurrentUser from "@/hooks/use-current-user";
import UserButton from "./user-button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavigationBar() {
  const user = useCurrentUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsLoginOpen(true);
    }
  }, [user]);

  return (
    <div className="flex py-2 px-4 items-center bg-indigo-950 text-white">
      <Link href="/create" className=" items-center w-20">
        <Image src="/logo/logo-white.png" alt="logo" className="w-10" width={40} height={40} />
      </Link>
      <div className="flex-grow" />
      <div className="flex items-center justify-end">
        {!user && <Login open={isLoginOpen} setOpen={setIsLoginOpen} />}
        {user && 
          <UserButton user={user} />
        }
      </div>
    </div>
  );
}