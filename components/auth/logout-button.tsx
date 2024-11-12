import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogoutButton() {
    const handleLogout = () => {
        signOut();
    }

    return (
        <Button variant="ghost" className="w-full text-left" onClick={handleLogout}>Logout</Button>
    )
}