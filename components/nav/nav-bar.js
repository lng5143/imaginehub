'use client';

import LoginDialog from "../auth/login-dialog";
import useCurrentUser from "@/hooks/use-current-user";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function NavigationBar({onClickSettings}) {
  const user = useCurrentUser();

  function logout() {
    signOut();
  }

  return (
    <div className="flex h-10 px-10 py-5 gap-10">
      <h1>NavigationBar</h1>
      <button className="" onClick={onClickSettings}>Settings</button>
      <LoginDialog />
      {user && 
        <div className="flex gap-10">
          <p>Hello, {user.name || user.email}</p>
          <Button onClick={logout}>Sign out</Button>
        </div>
      }
    </div>
  );
}