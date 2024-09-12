import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button className="w-full text-left" onClick={signOut}>Logout</button>
    )
}