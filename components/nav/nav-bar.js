'use client';

import Login from "../auth/login-dialog";
import useCurrentUser from "@/hooks/use-current-user";
import UserButton from "./user-button";

export default function NavigationBar() {
  const user = useCurrentUser();

  return (
    <div className="flex p-2 gap-10 justify-end bg-indigo-950 text-white">
      {!user && <Login />}
      {user && 
        <UserButton user={user} />
      }
    </div>
  );
}