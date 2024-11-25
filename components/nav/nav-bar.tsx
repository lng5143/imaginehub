"use client";

import Login from "../auth/login-dialog";
import UserButton from "./user-button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import UpgradeButton from "../settings/upgrade-button";
import { UserTier } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/server/actions/users";

export default function NavigationBar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      return await getCurrentUser();
    },
  });

  useEffect(() => {
    if (!user) {
      setIsLoginOpen(true);
    }
  }, [user]);

  return (
    <div className="flex py-2 px-4 items-center bg-indigo-950 text-white gap-2">
      <Link href="/create" className=" items-center w-20">
        <Image
          src="/logo/logo-white.png"
          alt="logo"
          className="w-10"
          width={40}
          height={40}
        />
      </Link>
      <div className="flex-grow" />
      {!isLoading && user?.tier === UserTier.FREE && (
        <UpgradeButton className="h-full" />
      )}
      <div className="flex items-center justify-end">
        {!isLoading && !user && (
          <Login open={isLoginOpen} setOpen={setIsLoginOpen} />
        )}
        {!isLoading && user && <UserButton user={user} />}
      </div>
    </div>
  );
}
